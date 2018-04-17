var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var DB = require('./database.js');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.listen(3000, function() {
  console.log('listening on port 3000!');
});