const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  rank: {type: Number, min: 1, required: true},
  description: {type: String}
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
