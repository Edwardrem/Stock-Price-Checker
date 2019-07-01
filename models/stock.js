const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  likes : { type: Number, required: true },
  ips   : [String]
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock; 
