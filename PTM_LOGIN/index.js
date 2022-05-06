// npm intit -y
// npm i --save--dev nodemon
// npm i --save express express-session passport passport-google-oauth2

const express = require('express');
// const { Passport } = require('passport/lib');
const session = require("express-session");

const passport = require('passport');

require('./auth');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

const app = express();

app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Signin</a>')
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);

app.get('/auth/failure', (req, res) => {
    res.send('Something went wrong');
});

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Logged out')
})

app.listen(5000, () => console.log('listening on 5000'));