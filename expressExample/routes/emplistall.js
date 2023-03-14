var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    const httpRequest = require('http');

    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJ1c2VyIjoiYmRwYW1rZWRfYWRtaW5zY290dCJ9LCJpYXQiOjE2Nzg4MjY0MDQsImV4cCI6MTY3ODg2MjQwNH0.Cpyqd5EZAYhtwtNH93lcMuU_p3ftJXibUUs8CYOtZsk',
        'content-type': 'application/json'
      }};
    
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
        console.log('Response: ', responseArray);
        res.render('emplistall', { title: 'Products R Us Employee List' , resultarray: responseArray});
      });
    });
    
    request.on('error', error => console.log('ERROR', error));
    
    request.end();






  //res.render('emplistall', { title: 'Products R Us Employee List' , resultarray: responseArray});
});

module.exports = router;