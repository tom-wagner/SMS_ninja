var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var DB = require('./database.js');
var twilio = require('./twilio.js');

if (!process.env) {
  var {acctSID, authToken, testSID, testToken, twilioNumber} = require('../config.js');
}

// overwrite if deployed
acctSID = process.env.acctSID || acctSID;
authToken = process.env.testSID || testSID;
testToken = process.env.testToken || testToken;
twilioNumber = process.env.twilioNumber || twilioNumber;

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/SMS', function(req, res) {
  // toDoLater! -- Schedule SMS delivery using Cron ---> https://github.com/kelektiv/node-cron (see WebHistorian for example use of Cron)

  console.log('req.body in POST /sms: \n', req.body);
  DB.addMessage(req.body, (err, success) => {
    if (err) {
      res.status(500).send('error posting to DB: ', err);
    } else {
      // Posted successfully to DB, now send via Twilio
      twilio.sendSMS(req.body.messageText, '+1' + req.body.recipient, twilioNumber).then((result, err) => {
        if (result.errorCode) {
          res.status(500).send(`Twilio server error: ${result.errorMessage}, please try again later.`);
        } else {
          res.status(200).send(result.body);
        }
      }).catch(err => {
        res.status(500).send(`Twilio server error: ${err}`)
      })
    }
  });
});

app.post('/newUser', function(req, res) {
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

app.post('/login', function (req, res) {
  // AUTHENTICATE USER LATER

  // For now:
    // Pull down phoneNumber
    DB.retrieveUserPhoneNumber(req.body.username, (err, docs) => {
      if (err) {
        console.log('err: ', err);
        res.status(500).send(err);
      } else {
        let phoneNumber = docs.phoneNumber;
        // Then pull down messages
        DB.retrieveUserMessages(req.body.username, (err, docs) => {
          if (err) {
            console.log('err: ', err);
            res.status(500).send(err);
          } else {
          // Then send everything back to client
          res.status(200).send([phoneNumber, docs]);
        }
      });
    }
  });
})

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port: ', this.address.port(), app.settings.env);
});