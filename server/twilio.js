// If the app is not running on Heroku it will default to the ../config.js file
if (!process.env.twilioNumber) {
  var {acctSID, authToken, testSID, testToken, twilioNumber} = require('../config.js');
} else {
  // else overwrite variables from config.js if deployed
  var acctSID = process.env.acctSID || acctSID;
  var authToken = process.env.authToken || authToken;
  var testToken = process.env.testToken || testToken;
  var twilioNumber = process.env.twilioNumber || twilioNumber;
}

const twilio = require('twilio');

var client = new twilio(acctSID, authToken);

function sendSMS(msg, recipient, sender) {
  return client.messages.create({
    body: msg,
    to: recipient,
    from: sender,
  });
}

exports.sendSMS = sendSMS;
exports.client = client;