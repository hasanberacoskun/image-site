var { errorPrint, successPrint, requestPrint } = require('../helpers/debug/debugprinters');

const routeProtectors = {};

// route protector for logged in privlidges
routeProtectors.userIsLoggedIn = function(req, res, next) {
  if(req.session.username) {
    successPrint("User is loggen in.");
    next();
  } else {
    errorPrint("User is not logged in.");
    req.flash('error', "You must be logged in to create a Post.");
    res.redirect('/login');
  }
}

module.exports = routeProtectors;
