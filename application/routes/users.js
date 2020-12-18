var express = require('express');
var router = express.Router();
var db = require('../config/database');
const UserModel = require('../models/Users')
var { errorPrint, successPrint, requestPrint } = require('../helpers/debug/debugprinters');
var UserError = require('../helpers/error/UserError');
var bcrypt = require('bcrypt');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* LOGIN */
router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  // DO VALIDATION PROPERLY LATER
  // selecting username from db

  UserModel.authenticate(username, password)
  .then((loggedUserId) => {
    if(loggedUserId > 0) {
      // log the user in
      successPrint(`User ${username} is logged in`);
      // properly set session
      req.session.username = username;
      req.session.userid = loggedUserId;
      console.log("User Name from session: " + req.session.username);
      console.log("User Id from session: " + req.session.userid);
      res.locals.logged = true;
      req.flash('success', "You have been successfully Logged In!");
      res.redirect('/');
    } else {
      // the username and password pair were not in the database
      throw new UserError("Invalid username and/or password!", "/login", 200);
    }
  })
  // catch any other errors during promise chain
  .catch((err) => {
    errorPrint("user login failed");
    if(err instanceof UserError) {
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect('/login');
    } else {
      next(err);
    }
  })
});

/* REGISTER */
router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let password_conf = req.body.password_conf;
  let age_conf = req.body.age_conf;
  let tos_conf = req.body.tos_conf;
  // DO VALIDATION PROPERLY LATER
  UserModel.usernameExists(username)
  .then((userDoesExist) => {
    if(userDoesExist) {
      // username has been found
      throw new UserError(
        "Registration Failed: Username already exists.",
        "/registration",
        200
      );
    } else {
      UserModel.emailExists(email);
    }
  })
  .then((emailDoesExist) => {
    if(emailDoesExist) {
      // email has been found
      throw new UserError(
        "Registration Failed: Email already exists.",
        "/registration",
        200
      );
    } else {
      return UserModel.create(username, password, email);
    }
  })
  .then((createdUserId) => {
    if(createdUserId < 0) {
       // something went wrong and nothing was inserted into the database
      throw new UserError(
        "Server Error, user could not be created",
        "/registration",
        500
      );
    } else {
      successPrint("User.js --> User was created!");
      req.flash('success', 'User account has been created!');
      res.redirect('/login');
    }
  })
  .catch((err) => {
    errorPrint("user could not be made", err);
    if(err instanceof UserError) {
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect(err.getRedirectURL());
      next();
    } else {
      next(err);
    }
  });
});

/* LOGOUT */
router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if(err) {
      errorPrint("Session could not be destroyed.");
    } else {
      successPrint("Session was destroyed");
      res.clearCookie('csid');
      res.json({status: "OK", message: "user is logged out"});
      res.redirect('/login');
    }
  });
});

module.exports = router;
