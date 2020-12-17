var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeProtectors').userIsLoggedIn;
var getRecentPosts = require('../middleware/postsmiddleware').getRecentPosts;
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

router.get('/post/:id(\\d+)', (req, res, next) => {
  let baseSQL = "SELECT u.id, u.username, p.title, p.description, p.photopath, p.created FROM users u JOIN posts p ON u.id=fk_userid WHERE p.id=?;";
  let postId = req.params.id;
  db.execute(baseSQL, [postId])
  .then(([results, fields]) => {
    if(results && results.length) {
      let post = results[0];
      res.render('imagepost', {currentPost: post, style: "imagepost.css"});
    } else {
      req.flash('error', "This post does not exist.");
      res.redirect('/');
    }
  })

});
module.exports = router;
