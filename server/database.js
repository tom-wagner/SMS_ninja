var mongoose = require('mongoose');

var DB = mongoose.connection;

mongoose.connect('mongodb://localhost/sms_ninja');

DB.on('error', console.error.bind(console, 'connection error:'));
DB.once('open', function() {
  'connected to MongoDB!!';
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
  Message.find({ username: username }, (err, docs) => {
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
      console.log(docs);
      callback(err, docs);
    }
  });
}

exports.addMessage = addMessage;
exports.addUser = addUser;
exports.retrieveUserMessages = retrieveUserMessages;
exports.retrieveUserPhoneNumber = retrieveUserPhoneNumber
exports.DB = DB;