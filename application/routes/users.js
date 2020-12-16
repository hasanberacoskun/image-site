var express = require('express');
var router = express.Router();
var db = require('../config/database');
var { errorPrint, successPrint, requestPrint } = require('../helpers/debug/debugprinters');
var UserError = require('../helpers/error/UserError');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* LOGIN */
router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  // DO VALIDATION PROPERLY LATER
  // selecting username from db
  let baseSQL = "SELECT username, password FROM users WHERE username=?;"
  db.execute(baseSQL,[username])
  // feed in results and fields from db search
  .then(([results, fields]) => {
    // if a match is found
    if(results && results.length == 1) {
      // when a user is found based on username, we compare password to hashed password
      let hashedPassword = results[0].password;
      console.log(hashedPassword);
      return bcrypt.compare(password, hashedPassword);
    } else {
      // the username and password pair were not in the database
      throw new UserError("Invalid username and/or password!", "/login", 200);
    }
  })
  // feed in passwords matched condition
  .then((passwordsMatched) => {
    console.log(passwordsMatched);
    if(passwordsMatched) {
      // log the user in
      successPrint(`User ${username} is logged in`);
      res.locals.logged = true
      res.render('index');
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
  console.log("selecting username");
  // selecting username from db
  db.execute("SELECT * FROM users WHERE username=?", [username])
  // feed in results and fields from username db search
  .then(([results, fields]) => {
    // if results not found
    if(results && results.length == 0) {
      console.log("selecting email");
      // selecting email from db
      return db.execute("SELECT * FROM users WHERE email=?", [email]);
    } else {
      // username has been found
      throw new UserError(
        "Registration Failed: Username already exists.",
        "/registration",
        200
      );
    }
  })
  // feed in results and fields from email search
  .then(([results, fields]) => {
    console.log(results.length);
    // if results not found
    if(results && results.length == 0) {
      // hash password and return
      console.log(password);
      return bcrypt.hash(password, 15);
    } else {
      // email has been found
      throw new UserError(
        "Registration Failed: Email already exists.",
        "/registration",
        200
      );
    }
  })
  // feed in hashed password from promise before
  .then((hashedPassword) => {
      console.log(hashedPassword);
      // insert user into database with hashed password
      let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?,?,?,now())";
      return db.execute(baseSQL, [username, email, hashedPassword]);
  })
  // feed in results and fields from database insertion
  .then(([results, fields]) => {
    // if data has been inserted (results exist and rows are effected)
    if(results && results.affectedRows) {
      // change this later
      successPrint("User.js --> User was created!");
      res.redirect('/login');
    } else {
      // something went wrong and nothing was inserted into the database
      throw new UserError(
        "Server Error, user could not be created",
        "/registration",
        500
      );
    }
  })
  // catch the error that occured during any of the promises above
  .catch((err) => {
    errorPrint("user could not be made", err);
    if(err instanceof UserError) {
      errorPrint(err.getMessage());
      res.status(err.getStatus());
      res.redirect(err.getRedirectURL());
      next();
    } else {
      next(err);
    }
  })
});

module.exports = router;
