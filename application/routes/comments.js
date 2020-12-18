var express = require('express');
var router = express.Router();
const { errorPrint, successPrint, requestPrint } = require('../helpers/debug/debugprinters');
const { create } = require('../models/Comments');

router.post('/create', (req, res, next) => {
  if(!req.session.username) {
    res.json({
      code: -1,
      status: "danger",
      message: "Must be logged in to create a comment."
    });
  } else {
    let {postId, comment} = req.body;
    let username = req.session.username;
    let userId = req.session.userid;

    create(userId, postId, comment)
    .then((wasSuccessful) => {
      if (wasSuccessful !== -1) {
        successPrint(`comment was created for ${username}`);
        res.json({
          code: 1,
          status: "success",
          message: "comment created",
          commment: comment,
          username: username
        });
      } else {
        errorPrint("comment was not saved");
        res.json({
          code: -1,
          status: "danger",
          message: "comment was not created"
        });
      }
    })
    .catch((err) => next(err));
  }
});

module.exports = router;
