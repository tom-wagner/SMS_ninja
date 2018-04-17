var {acctSID, authToken, testSID, testToken, twilioNumber} = require('../config.js');

// overwrite if deployed
acctSID = process.env.acctSID || acctSID;
authToken = process.env.testSID || testSID;
testToken = process.env.testToken || testToken;
twilioNumber = process.env.twilioNumber || twilioNumber;

const twilio = require('twilio');

var client = new twilio(acctSID, authToken);

function sendSMS(msg, recipient, sender) {
  console.log('twilio.js', msg, recipient, sender);
  return client.messages.create({
    body: msg,
    to: recipient,
    from: sender,
  });
}

exports.sendSMS = sendSMS;
exports.client = client;