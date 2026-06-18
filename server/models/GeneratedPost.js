const mongoose = require('mongoose');

const generatedPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  audience: {
    type: String,
    required: true
  },
  tone: {
    type: String,
    required: true
  },
  length: {
    type: String,
    required: true
  },
  additionalContext: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  hashtags: [String],
  cta: {
    type: String,
    default: ''
  },
  modelUsed: {
    type: String,
    default: 'google/gemini-2.0-flash'
  },
  isSaved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GeneratedPost', generatedPostSchema);
