require('./model/db.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var routes = require('./routes/routes.js');
var passport = require('passport');
const session = require('express-session');

// Define the port to run on
app.set('port', 5000);

// Add middleware to console log every request
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next(); 
});

// Set static directory before defining routes
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// enable cors
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use('/api', routes);

// Listen for requests
var server = app.listen(app.get('port'), () => {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});