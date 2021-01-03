const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Catagory = mongoose.model('Catagory', catagorySchema);

module.exports = Catagory;
