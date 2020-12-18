var express = require('express');
var router = express.Router();
var { errorPrint, successPrint, requestPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostModel = require('../models/Posts');
var PostError = require('../helpers/error/PostError');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "public/images/uploads")
  },
  filename: function(req, file, cb){
    // rename file randomly while retaining file extension
    let fileExt = file.mimetype.split('/')[1];
    let randomName = crypto.randomBytes(22).toString("hex");
    cb(null, `${randomName}.${fileExt}`);
  }
});

var uploader = multer({storage: storage});

// uploader handles image before create post
router.post('/createPost', uploader.single("image"), (req, res, next) => {
  let fileUploaded = req.file.path;
  let fileAsThumbnail = `thumbnail-${req.file.filename}`;
  let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
  let title = req.body.post_title;
  let description = req.body.post_description;
  let fk_userId = req.session.userid;
  console.log(fk_userId);
  console.log(description);
  console.log(fk_userId);
  console.log(fileUploaded);
  // various checks to see if user is allowed to post
  if (fk_userId == '') {
    req.flash("error", "You must be logged in to post.");
    res.redirect('/login');
    next(err);
  }
  if (title == '') {
    req.flash("error", "Title cannot be empty.");
    res.redirect('/postimage');
    next(err);
  }
  if (description == '') {
    req.flash("error", "Description cannot be empty.");
    res.redirect('/postimage');
    next(err);
  }
  // create thumbnail using sharp
  sharp(fileUploaded)
  .resize(200)
  .toFile(destinationOfThumbnail)
  .then(() => {
    // post creation is done in the model
    return PostModel.create(title, description, fileUploaded, destinationOfThumbnail, fk_userId);
  })
  .then((postWasCreated) => {
    if(postWasCreated) {
      req.flash("success", "Your post was created successfully");
      res.redirect('/');
    } else {
      throw new PostError("Post could not be created!", 'postImage', 200);
    }
  })
  .catch((err) => {
    if(err instanceof PostError) {
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect(err.getRedirectURL());
    } else {
      next(err);
    }
  });
});

router.get('/search', async (req, res, next) => {
  try {
    let searchTerm = req.query.search;
    if(!searchTerm) {
      res.send({
        resultsStatus: "info",
        message: "No search term given",
        results: []
      });
      } else {
        let results = await PostModel.search(searchTerm)
        if(results.length) {
          res.render('index', {
            title: "Results",
            style: "index.css",
            resultsStatus: "info",
            message: `${results.length} results found`,
            results: results
          });
        } else {
          let results = await PostModel.getNRecentPosts(8);
          res.locals.results = results;
          res.render('index', {
            title: "Results",
            style: "index.css",
            resultsStatus: "info",
            message: "No results match your search.",
            results: results
          });
        }
      }
  } catch(err) {
    next(err);
  }
});

module.exports = router;
