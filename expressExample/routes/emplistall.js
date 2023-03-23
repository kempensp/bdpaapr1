var express = require('express');
var router = express.Router();

// var api_functions = require('../public/javascripts/api_functions');
// // set the token value when the app starts up
// if ( typeof global.DB_token === 'undefined') {
//     api_functions.data.db_sign_in();   
// };

/* GET home page. */
router.get('/', function(req, res, next) {

    const httpRequest = require('http'); //This may end up being https in other situations

    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJ1c2VyIjoiYmRwYW1rZWRfYWRtaW5zY290dCJ9LCJpYXQiOjE2NzkxNDg5NTIsImV4cCI6MTY3OTE4NDk1Mn0._WKLH7vM7YoOL1FJlKorPvb1VWXj9l5-dUDZrLTtUjw',
         'content-type': 'application/json'
      }};
    //Authorization header will need to be updated
    
    const request = httpRequest.request('http://bdpamkedev.com/api/v5/employees/?pageNo=1&pageSize=100', options, response => {
      console.log('Status', response.statusCode);
      console.log('Headers', response.headers);
      let responseData = '';
    
      response.on('data', dataChunk => {
        responseData += dataChunk;
      });
      response.on('end', () => {
        let responseParsed=JSON.parse(responseData);
        let responseArray=responseParsed.records;
        console.log('Response: ', responseArray); //debugging code to test
        res.render('emplistall', { title: 'Products R Us Employee List' , resultarray: responseArray});
      });
    });
    request.on('error', error => console.log('ERROR', error));
    request.end();






  //res.render('emplistall', { title: 'Products R Us Employee List' , resultarray: responseArray});
});

module.exports = router;
