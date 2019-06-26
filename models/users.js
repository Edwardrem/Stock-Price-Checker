const mongoose = require('mongoose')
const shortid = require('shortid')


const usersSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    unique: true,
    maxlength: [20, 'username too long']
  },
  _id: {
    type: String,
    index: true,
    default: shortid.generate
  }
})

module.exports = mongoose.model('Users', usersSchema)