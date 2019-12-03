const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')
const { database } = require('./keys')


// Inits
const app = express();
require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(session({
    secret: "crowd123",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

// Globals
app.use((req, res, next) => {
    next()
})

// Routes
app.use(require('./routes/'))
app.use(require('./routes/authentication'))
app.use('/geolocation', require('./routes/geolocation'))

app.listen(app.get('port'), () => {
    console.log("Server running on port", app.get('port'))
})