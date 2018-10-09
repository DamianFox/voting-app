var express = require('express');
var app = express();
// var path = require('path');
var bodyParser = require('body-parser');
const cors = require('cors');
var routes = require('./routes');

// Define the port to run on
app.set('port', 3000);

// Add middleware to console log every request
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next(); 
});

// Set static directory before defining routes
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(cors());

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
app.use('/api', (req, res) => {
		res.send('Hello');
	});

// Listen for requests
var server = app.listen(app.get('port'), () => {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});