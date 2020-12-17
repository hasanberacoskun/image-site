var express = require('express');
var router = express.Router();
var db = require('../config/database');
var { errorPrint, successPrint, requestPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
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
  // create thumbnail using sharp
  let fileAsThumbnail = `thumbnail-${req.file.filename}`;
  let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
  let title = req.body.post_title;
  let description = req.body.post_description;
  let fk_userId = req.session.userid;
  console.log(fk_userId)
  // DO SERVER VALIDATION ON YOUR OWN (make sure post title, description, and foreign key not empty)
  sharp(fileUploaded)
  .resize(200)
  .toFile(destinationOfThumbnail)
  .then(() => {
    let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?, ?, ?, ?, now(), ?);;';
    return db.execute(baseSQL, [title, description, fileUploaded, destinationOfThumbnail, fk_userId]);
  })
  .then(([results, fields]) => {
    if(results && results.affectedRows) {
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

router.get('/search', (req, res, next) => {
  let searchTerm = req.query.search;
  if(!searchTerm) {
    res.send({
      resultsStatus: "info",
      message: "No search term given",
      results: []
    });
    } else {
      let baseSQL = 'SELECT id, title, description, thumbnail, concat_ws(" ", title, description) AS haystack FROM posts HAVING haystack like ?;';
      let sqlReadySearchTerm = "%" + searchTerm + "%";
      db.execute(baseSQL, [sqlReadySearchTerm])
      .then(([results, fields]) => {
        if(results && results.length) {
          console.log("I'm here");
          res.render('index', {
            title: "Results",
            style: "index.css",
            resultsStatus: "info",
            message: `${results.length} results found`,
            results: results
          });
        } else {
          db.query('SELECT id, title, description, thumbnail, created FROM posts ORDER BY created LIMIT 8;', [])
          .then(([results, fields]) => {
            res.render('index', {
              title: "Results",
              style: "index.css",
              resultsStatus: "info",
              message: "No results were found.",
              results: results
            });
          })
          .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
    }

});

module.exports = router;
