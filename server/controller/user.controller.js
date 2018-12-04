var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport'),
  express = require('express'),
  jwt = require('jsonwebtoken'),
  expressJwt = require('express-jwt'),
  request = require('request'),
  twitterConfig = require('../twitter.config.js');

var passportConfig = require('../passport');

// setup configuration for twitter login
passportConfig();

var createToken = function(auth) {
  console.log("createToken");
  return jwt.sign({
    id: auth.id
  }, 'my-secret',
  {
    expiresIn: 60 * 120
  });
};

var generateToken = (req, res, next) => {
  console.log("generateToken");
  req.token = createToken(req.auth);
  return next();
};

var sendToken = (req, res) => {
  console.log("sendToken ->", req.token);
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

module.exports.requestTokenUrl = (req, res) => {
  console.log("requestTokenUrl");
	request.post({
		url: 'https://api.twitter.com/oauth/request_token',
		oauth: {
			oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2F",
			consumer_key: twitterConfig.consumerKey,
			consumer_secret: twitterConfig.consumerSecret
		}
	}, function (err, r, body) {
		if (err) {
			return res.send(500, { message: err.message });
		}

		var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';

		res.send(JSON.parse(jsonStr));
	});
};

module.exports.authenticateUser = (req, res, next) => {
  console.log("authenticateUser");
  request.post({
    url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
    oauth: {
      consumer_key: twitterConfig.consumerKey,
      consumer_secret: twitterConfig.consumerSecret,
      token: req.query.oauth_token
    },
    form: { oauth_verifier: req.query.oauth_verifier }
  }, function (err, r, body) {
    console.log("Before if (err): body ->",  body);
    if (err) {
      return res.send(500, { message: err.message });
    }
    console.log("After if (err)");
    const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
    const parsedBody = JSON.parse(bodyString);

    req.body['oauth_token'] = parsedBody.oauth_token;
    req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
    req.body['user_id'] = parsedBody.user_id;

    // console.log("parsedBody", parsedBody);
    console.log("Just before next()");
    next();
  })
}, passport.authenticate('twitter', {session: false}), function(req, res, next) {
    console.log("Passport authenticate");
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }

    // prepare token for API
    req.auth = {
      id: req.user.id
    };

    next();
}, (generateToken, sendToken);

token handling middleware
var authenticate = expressJwt({
  secret: 'my-secret',
  requestProperty: 'auth',
  getToken: function(req) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});