var mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  answer: {
    type: String,
    unique: false
  },
  votes: {
    type: Number,
    default: 0,
  }
});

const PollSchema = new mongoose.Schema({
  question: {
    type: String, 
    required: true,
    unique: true
  },
  answers: [AnswerSchema]
});

mongoose.model('Poll', PollSchema);