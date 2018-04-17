var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var DB = require('./database.js');
var twilio = require('./twilio.js');
var {acctSID, authToken, testSID, testToken, twilioNumber} = require('../config.js');

// overwrite if deployed
acctSID = process.env.acctSID || acctSID;
authToken = process.env.testSID || testSID;
testToken = process.env.testToken || testToken;
twilioNumber = process.env.twilioNumber || twilioNumber;

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/SMS', function(req, res) {
  
  // message text, recipient number (ex: '+16123603573'), twilioNumber (same format)
  twilio.sendSMS(req.query.msg, req.query.recipient, twilioNumber).then((result, err) => {
    if (result.errorCode) {
      res.status(500).send(`Server error: ${result.errorMessage}, please try again later.`)
    } else {
      res.status(200).send(result.body);
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});