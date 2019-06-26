const mongoose = require('mongoose')

const exercisesSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    maxlength: [20, 'no more than 20 chars']
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'no less than 1 min']
  },
  date: {
    type: Date,
    default: Date.now
  },
  username: String,
  userId: {
    type: String,
    ref: 'Users',
    index: true
  }
})

module.exports = mongoose.model('Exercises', exercisesSchema)