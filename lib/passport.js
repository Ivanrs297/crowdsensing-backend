const helpers =  require('../lib/helpers')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database')

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM User WHERE username = ?', [username])
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password)
        console.log("validPassword: ", validPassword)

        if (validPassword) {
            done(null, user)
        } else {
            done(null, false)
        }
    } else {
        return done(null, false)
    }
}))

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
    const { fullname, speciality, genre, age } = req.body
    const newUser = {
        username,
        password,
        fullname,
        speciality,
        genre,
        age
    }
    newUser.password = await helpers.encryptPassword(password)
    try {
        const result = await pool.query('INSERT INTO User SET ?', [newUser])
        newUser.id = result.insertId
        return done(null, newUser)
    } catch(err) {
        console.log("ERR: ", err)
        return done(err, newUser)
    }
    
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM User WHERE id = ?', [id])
    done(null, rows[0])
})