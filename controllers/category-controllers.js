const express = require('express');
const Category = require('../models/category.js');
const categories = express.Router();

categories.get('/new', (req, res) => {
  res.render(
    'categories/new.ejs'
  )
})





module.exports = categories;
