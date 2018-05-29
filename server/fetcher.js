var moment = require('moment');
var DB = require('./database.js');
var CRON = require('cron');

if (!process.env.twilioNumber) {
  var { acctSID, authToken, testSID, testToken, twilioNumber } = require('../config.js');
} else {
  var twilioNumber = process.env.twilioNumber || twilioNumber;
}

var twilio = require('twilio')(acctSID, authToken);

let fetchMessages = () => {
  return DB.retrieveMessagesToSend(moment());
};

let sendMessages = messages => {
  return Promise.all(
    messages.map(msg => {
      return twilio.messages.create({
        to: msg.recipient,
        from: twilioNumber,
        body: msg.messageText
      });
    }));
};

let deleteMessages = messages => {
  return DB.deleteSentMessages(messages);
};

// temp storage for CronJob below:
var messagesToDelete;

let timer = new CRON.CronJob({
  // cron format: 'seconds minutes hours dayOfMonth month dayOfWeek' --> https://www.npmjs.com/package/cron#cron-ranges
  // fetching messages once per minute
  cronTime: '1 * * * * *',
  onTick: () => {
    fetchMessages()
      .then(messages => {
        messagesToDelete = messages;
        console.log('mtd: ', messagesToDelete)
        sendMessages(messages)
      })
      .then(() => deleteMessages(messagesToDelete))
      .then(result => () => console.log('result of delete: ', result))
      .catch(err => () => console.log('err: ', err));
  },
  start: true,
  timeZone: 'America/New_York',
});