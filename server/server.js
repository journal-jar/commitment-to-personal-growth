// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const jwt = require('jsonwebtoken');
// const session = require('express-session');
require('dotenv').config({path: '../.env'});
const express = require('express');
const { connect } = require("./config/connection.js")
const path = require('path');
const routes = require('./routes');
const app = express();
//define PORT as either 3001 or as process for deployment
const PORT = process.env.PORT || 3001;


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}


connect()
  .then(() => {
    console.log('Connected successfully to MongoDB');
    // start up express server
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error: ', err.message);
  });



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)



// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // Find or create a user in the database.
//     // For this example, we'll just create a token with the profile's Google ID.
//     const token = jwt.sign({ googleId: profile.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     cb(null, { profile, token });
//   }
// ));

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // The user object is available as req.user.
//     // We're assuming it has a profile and token property.
//     res.redirect(`/some-private-page?token=${req.user.token}`);
//   });

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers['authorization'];

//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(' ');
//     const bearerToken = bearer[1];
//     jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
//       if (err) {
//         res.sendStatus(403);
//       } else {
//         req.user = authData;
//         next();
//       }
//     });
//   } else {
//     res.sendStatus(403);
//   }
// }

// app.get('/some-private-page', verifyToken, (req, res) => {
//   // The decoded token is available as req.user.
//   res.json({ message: 'Welcome to the private page!', user: req.user });
// });
