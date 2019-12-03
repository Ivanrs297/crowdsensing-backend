const express = require('express')
const router = express.Router()

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth')

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/loggedIn',
    failureRedirect: '/failureSign',
    failureFlash: false
  }));

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/loggedIn',
        failureRedirect: '/failureSign',
        failureFlash: false
    }) (req, res, next);
})

router.get('/loggedIn', isLoggedIn, (req, res) => {
    res.status(200).send('Logged In');
})


router.get('/failureSign', (req, res) => {
    res.status(401).send('Unauthorized');
})

router.get('/logout', (req, res) => {
    req.logOut()
    res.status(200).send('Logout');
})



module.exports = router;