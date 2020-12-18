var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeProtectors').userIsLoggedIn;
const {getRecentPosts, getPostById} = require('../middleware/postsmiddleware')
var db = require("../config/database");

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', {
    title: "Home",
    style: "index.css",
    message: "Most recent posts:"
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

router.get('/post/:id(\\d+)', getPostById, (req, res, next) => {

  res.render('imagepost', {style: "imagepost.css", title: `Post ${req.params.id}`});
});
module.exports = router;
