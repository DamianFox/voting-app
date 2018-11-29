var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');

module.exports.pollGetAll = (req, res) => {
  console.log('Requested by: ' + req.user);
  console.log('GET the polls');
  console.log(req.query);

  Poll
    .find()
    .exec((err, polls) => {
      console.log(err);
      console.log(polls);
      if (err) {
        console.log("Error finding polls");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found polls", polls.length);
        res
          .json(polls);
      }
    });

};

module.exports.pollGetOne = (req, res) => {
  var id = req.params.pID;

  // console.log('req.params', req.params);
  console.log('GET pollId', id);

  Poll
    .findById(id)
    .exec((err, poll) => {
      var response = {
        status : 200,
        message : poll
      };
      if (err) {
        console.log("Error finding poll");
        response.status = 500;
        response.message = err;
      } else if(!poll) {
        console.log("PollId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Poll ID not found " + id
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });

};

module.exports.pollAddOne = (req, res) => {
  console.log("POST new Poll");
  
  let answers = req.body.newPoll.answers;
  let newAnswers = [];

  answers.forEach(el => {
  	newAnswers.push({
  		answer: String(el),
  		votes: parseInt(0)
  	});
  });

  Poll
    .create({
      question : req.body.newPoll.question,
      answers : newAnswers
    }, (err, poll) => {
      if (err) {
        console.log("Error creating poll");
        console.log(err);
        res
          .status(400)
          .json(err);
      } else {
        console.log("Poll created!", poll);
        res
          .status(201)
          .json(poll);
      }
    });
};

module.exports.pollIncreaseVote = function(req, res) {
  var pollId = req.params.pollId;
  var answerId = req.params.answerId;
  console.log('PUT for pollId ' + pollId);

  Poll
    .findById(pollId)
    .select('answers')
    .exec((err, poll) => {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding poll");
        response.status = 500;
        response.message = err;
      } else if(!Poll) {
        console.log("Poll id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Poll ID not found " + id
        };
      } else {
        // Get the answer
        thisAnswer = poll.answers.id(answerId);
        // If the answer doesn't exist Mongoose returns null
        if (!thisAnswer) {
          response.status = 404;
          response.message = {
            "message" : "Poll ID not found " + answerId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisAnswer.votes++
        poll.save((err, pollUpdated) => {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });

};
