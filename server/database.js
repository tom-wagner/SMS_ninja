var mongoose = require('mongoose');

var DB = mongoose.connection;

mongoose.connect('mongodb://localhost/sms_ninja');

DB.on('error', console.error.bind(console, 'connection error:'));
DB.once('open', function() {
  'connected to MongoDB!!';
});

let mySchema = mongoose.Schema({
  jobTitle: String,
  description: String,
  city: String,
  salary: Number,
  interestLevel: String,
  experienceReq: Number,
  skillsReq: [],
});

Entry = DB.model('Entry', mySchema)

exports.DB = DB;