var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeProtectors').userIsLoggedIn;
var getRecentPosts = require('../middleware/postsmiddleware').getRecentPosts;

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', {
    title: "Home",
    style: "index.css"
  });
});

router.get('/login', (req, res, next) => {
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

router.use('/postImage', isLoggedIn);
router.get('/postimage', (req, res, next) => {
  res.render("postimage", {
    title: "Post an Image",
    style: "postimage.css"
  });
});

module.exports = router;
