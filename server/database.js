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
  Message.create({

  }), (err, success) => {
    if (err) {
      callback(null, err);
    } else {
      callback(null, success);
    }
  }
}

function addUser(userDetails, callback) {
  console.log('userDetails: ', userDetails);
  
  User.create({
    username: 'test entry',
    email: 'test entry',
    phoneNumber: 'test entry!!',
    hashedPassword: 'test entry!!',
    salt: 'test entry!!',
  }), (err, success) => {
    if (err) {
      callback(null, err);
    } else {
      console.log('success in DB: ', success);
      callback(null, success);
    }
  }
}

exports.addUser = addUser;
exports.addMessage = addMessage;
exports.DB = DB;