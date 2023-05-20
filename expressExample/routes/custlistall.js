var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");

/* GET home page. */
router.get('/', auth, function(req, res, next) {
    const result = res.locals.result;
    if (result=="public"){
       res.redirect('login');
    }
    else //We eventually want this separated into employee and admin cases 
    {
      const httpRequest = require('http'); //This may end up being https in other situations

    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + global.DB_token,
        'content-type': 'application/json'
      }};
    
    const request = httpRequest.request('http://bdpamkedev.com/api/v5/customers/?pageNo=1&pageSize=100', options, response => {
      console.log('Status', response.statusCode);
      //console.log('Headers', response.headers);
      let responseData = '';
    
      response.on('data', dataChunk => {
        responseData += dataChunk;
      });
      response.on('end', () => {
        let responseParsed=JSON.parse(responseData);
        let responseArray=responseParsed.records;
        //console.log('Response: ', responseArray); //debugging code to test
        res.render('custlistall', { title: 'Products R Us Customer List' , resultarray: responseArray, user:result});
      });
    });
    request.on('error', error => console.log('ERROR', error));
    request.end();
    }
    
});

module.exports = router;