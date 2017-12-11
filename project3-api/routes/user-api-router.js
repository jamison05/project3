const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user-model');


const router = express.Router();


router.post('/signup', (req, res, next) => {
    if (req.body.password === undefined ||
        req.body.password.length < 8   ||
        req.body.password.match(/[^a-z0-9]/i) === null
    ) {
        res.status(400).json({ error:"There was an invalid password" });

          return;
    }

    User.findOne({ username: req.body.username })
      .then((userFromDb) => {
          if (userFromDb !== null) {
              res.status(400).json({ error: 'Username is taken' });
              return;
          }

          const salt = bcrypt.genSaltSync(10);
          const scrambledPassword = bcrypt.hashSync(req.body.password, salt);

          const theUser = new User({
              fullName: req.body.fullName,
              username: req.body.username,
              encryptedPassword: scrambledPassword
          });

          return theUser.save();
      })
      .then((userFromDb) => {
          // log the user in automatically if sign up works
          req.login(userFromDb, (err) => {
              // clear the "encryptedPassword" before sending the user info
              // (otherwise it's a security risk)
              userFromDb.encryptedPassword = undefined;

              res.status(200).json({
                  isLoggedIn: true,
                  userInfo: userFromDb
              });
          });
      })
      .catch((err) => {
          console.log("POST /signup ERROR!");
          console.log(err);

          if (err.errors) {
              res.status(400).json(err.errors);
          }
          else {
              res.status(500).json({ error: 'Sign up database error' });
          }
      });
}); // POST /signup


router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
      .then((userFromDb) => {
          if (userFromDb === null) {
              res.status(400).json({ error: 'Username is invalid' });
              return;
          }

          const isPasswordGood =
            bcrypt.compareSync(req.body.password, userFromDb.encryptedPassword);

          if (isPasswordGood === false) {
              res.status(400).json({ error: 'Password is invalid' });
              return;
          }

          req.login(userFromDb, (err) => {
              // clear the "encryptedPassword" before sending the user info
              // (otherwise it's a security risk)
              userFromDb.encryptedPassword = undefined;

              res.status(200).json({
                  isLoggedIn: true,
                  userInfo: userFromDb
              });
          });
      })
      .catch((err) => {
          console.log("POST /login ERROR!");
          console.log(err);

          res.status(500).json({ error: 'Log in database error' });
      });
}); // POST /login


router.delete('/logout', (req, res, next) => {
    req.logout();

    res.status(200).json({
        isLoggedIn: false,
        userInfo: null
    });
}); // DELETE /logout


router.get('/checklogin', (req, res, next) => {
    if (req.user) {
        // clear the "encryptedPassword" before sending the user info
        // (otherwise it's a security risk)
        req.user.encryptedPassword = undefined;

        res.status(200).json({
            isLoggedIn: true,
            userInfo: req.user
        });
    }
    else {
        res.status(200).json({
            isLoggedIn: false,
            userInfo: null
        });
    }
}); // GET /checklogin


module.exports = router;
