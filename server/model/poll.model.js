var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
  question: {
    type: String, 
    required: true
  },
  answers: { 
    type: [answerSchema],
    required: true
  }
});

var answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    unique: true,
  },
  votes: {
    type: Number,
    default: 0,
  }
});

mongoose.model('Poll', pollSchema);