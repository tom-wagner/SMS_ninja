var mongoose = require('mongoose');

if (!process.env.MLAB_URL) {
  var { MLAB_URL } = require('../config.js')
}

var DB = mongoose.connection;

mongoose.connect(process.env.MLAB_URL || MLAB_URL);

DB.on('error', console.error.bind(console, 'connection error:'));
DB.once('open', function() {
  console.log('connected to MongoDB!!');
});

let userSchema = mongoose.Schema({
  username: String,
  email: String,
  phoneNumber: String,
  hashedPassword: String,
  salt: String,
});

let messageSchema = mongoose.Schema({
  username: String,
  recipient: String,
  messageText: String,
  dateTime: Date,
});

Message = DB.model('Message', messageSchema);
User = DB.model('User', userSchema);

function addMessage(msgDetails, callback) {
  Message.create(msgDetails, err => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, 'success!');
    }
  });
}

function addUser(userDetails, callback) {
  User.create(userDetails, err => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, 'success!');
    }
  });
}

function retrieveUserMessages(username, callback) {
  Message.find({ username: username }).sort({ dateTime: -1 }).exec((err, docs) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, docs);
    }
  });
}

function retrieveUserPhoneNumber(username, callback) {
  User.findOne({username: username}, (err, docs) => {
    if (err) {
      callback(err, null);
    } else {
      callback(err, docs);
    }
  });
}

function retrieveUserHash(username, callback) {
  // need to update to only send back hashed password in response to query
  User.findOne({username: username}, (err, docs) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, docs.hashedPassword);
    }
  });
}

function retrieveMessagesToSend(date) {
  // added an extra second to address Date.now() rounding issues
  // messages will not be accidentally sent twice as they are deleted once sent
  let minDate = date - 31000;
  let maxDate = date + 31000;
  console.log('min and max: ', { minDate, maxDate });
  return Message.find({ dateTime: {$gt: minDate, $lt: maxDate }}).exec();
}

function deleteSentMessages(messages) {
  let messageIDs = messages.map(msg => msg._id);
  console.log('messageIDs to be deleted: ', messageIDs);
  return Message.deleteMany({ _id: { $in: messageIDs }}).exec();
}

function deleteMessage(_id) {
  return Message.deleteOne({ _id });
}

exports.addMessage = addMessage;
exports.addUser = addUser;
exports.retrieveUserMessages = retrieveUserMessages;
exports.retrieveUserPhoneNumber = retrieveUserPhoneNumber
exports.retrieveUserHash = retrieveUserHash;
exports.retrieveMessagesToSend = retrieveMessagesToSend;
exports.deleteSentMessages = deleteSentMessages;
exports.deleteMessage = deleteMessage;
exports.DB = DB;