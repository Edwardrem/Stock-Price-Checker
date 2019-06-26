const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose
  .connect(process.env.MLAB_URI, { 
    useNewUrlParser: true,
    autoIndex: false
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to MongoDB...", err));

module.exports.Users = require('./users');
module.exports.Exercises = require('./exercises');