var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var DB = require('./database.js');
var twilio = require('./twilio.js');
var bcrypt = require('bcrypt');
var CRON = require('./fetcher.js');

if (!process.env.twilioNumber) {
  var { twilioNumber } = require('../config.js');
} else {
  var twilioNumber = process.env.twilioNumber;
}

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/SMS', function(req, res) {
  DB.addMessage(req.body, (err, success) => {
    if (err) {
      // Message not saved to DB but will be sent now anyways if user requested immediately delivery
      if (req.body.sendTime === 'sendNow') {
        twilio
          .sendSMS(req.body.messageText, '+1' + req.body.recipient, twilioNumber)
          .then(result => res.status(200).send('Message delivered successfully but not saved to database.'))
          .catch(err => res.status(500).send(`Twilio ${err}`));
      } else {
        res.status(500).send('Failure scheduling message, please try again');
      }
    }

    // Message saved successfully to DB but will be sent now anyways if user requested immediately delivery
    if (req.body.sendTime === 'sendNow') {
      twilio
        .sendSMS(req.body.messageText, '+1' + req.body.recipient, twilioNumber)
        .then(result => res.status(200).send('Message delivered successfully!'))
        .catch(err => res.status(500).send(`Twilio ${err}`));
    } else {
      res.status(200).send('Message scheduled successfully!');
    }
  });
});

app.post('/newUser', function(req, res) {
  // toDoLater! -- check if username and emails are already in the database
  // show the user real-time whether username is available

  let userDetails = req.body;

  bcrypt.hash(userDetails.password, 10, (err, hash) => {
    if (err) {
      res.status(500).send('Error hashing password: ', err);
    } else {
      userDetails.hashedPassword = hash;
      delete userDetails.password;

      // add user to DB
      DB.addUser(userDetails, (err, success) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send('New user successfully posted to DB!');
        }
      });
    }
  })

});

app.post('/login', function (req, res) {
  DB.retrieveUserHash(req.body.username, (err, hashedPassword) => {
    if (err) {
      res.status(500).send(err);
    } else {
      bcrypt.compare(req.body.password, hashedPassword, (err, success) => {
        if (err) {
          return res.status(401).send('password does not match!!');
        }

        if (!success) {
          return res.status(401).send('not authenticated!');
        }

        if (success) {
          DB.retrieveUserPhoneNumber(req.body.username, (err, docs) => {
            if (err) {
              res.status(500).send(err);
            } else {
              let phoneNumber = docs.phoneNumber;
              DB.retrieveUserMessages(req.body.username, (err, docs) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.status(200).send([phoneNumber, docs]);
                }
              });
            }
          });
        }
      });
    }
  });
});

app.delete('/message', function (req, res) {
  console.log({ req });
  DB.deleteMessage(req.query._id)
    .then(result => {
      console.log({ result });
      res.status(200).send('success!');
    })
    .catch(err => {
      console.log({ err });
      res.status(200).send('error!');
    });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port: ', process.env.PORT || 3000);
});