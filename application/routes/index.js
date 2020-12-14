var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: "Home",
    style: "index.css",
    script: "samplejs.js"
  });
});

router.get('/login', (req, res, next) => {
  next(new Error('test'));
  res.render("login", {
    title: "Login",
    style: "login.css"
  });
});

router.get('/registration', (req, res, next) => {
  res.render("registration", {
    title: "Registration",
    style: "registration.css",
    script: "formValidation.js"
  });
});

router.get('/postimage', (req, res, next) => {
  res.render("postimage", {
    title: "Post an Image",
    style: "postimage.css"
  });
});

module.exports = router;
