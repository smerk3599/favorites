const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  numberOfItems: { type: Number, default: 0}
});

const Catagory = mongoose.model('Catagory', catagorySchema);

module.exports = Catagory;
