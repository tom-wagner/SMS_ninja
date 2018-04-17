var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var DB = require('./database.js');
var twilio = require('./twilio.js');
var {acctSID, authToken, testSID, testToken, twilioNumber} = require('../config.js');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/sendSMS', function(req, res) {
  console.log(req.query.msg);
  console.log(twilioNumber);
  twilio.sendSMS(req.query.msg, '+16123603573', twilioNumber).then(result => {
    console.log(result);
    res.status(200).send('I think it worked!');
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});