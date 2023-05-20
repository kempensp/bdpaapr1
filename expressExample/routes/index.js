var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");

var api_functions = require('../public/javascripts/api_functions');
// set the token value when the app starts up
if ( typeof global.DB_token === 'undefined') {
    api_functions.data.db_sign_in();   
};

/* GET home page. */
router.get('/', auth, function(req, res, next) {
  result=res.locals.result;
  res.render('index', { title: 'Products Are Us Home', user: result });
});

module.exports = router;
