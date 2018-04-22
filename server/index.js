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
  twilio.sendSMS(req.body.msg, '+1' + req.body.phoneNumber, twilioNumber).then((result, err) => {
    if (result.errorCode) {
      res.status(500).send(`Server error: ${result.errorMessage}, please try again later.`)
    } else {
      res.status(200).send(result.body);
    }
  }).catch(err => {
    console.log(err);
  })
});

app.post('/newUser', function (req, res) {
  // toDoLater! -- check if username and emails are already in the database
  // show the user real-time whether username is available
  // hash password using bCrypt or similar

  DB.addUser(req.body, (err, success) => {
    if (err) {
      console.log('err: ', err);
      res.status(500).send(err);
    } else {
      res.status(200).send('New user successfully posted to DB!');
    }
  });
});

app.post('/message', function (req, res) {
  // post message to DB
});

app.post('/login', function (req, res) {
  // pull user's phoneNumber and scheduled messages from the database and send to the client
})

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});