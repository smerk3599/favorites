const express = require('express');
const Item = require('../models/fav-item.js');
const items = express.Router();

// NEW
items.get('/new/:catName', (req, res) => {
  res.render(
    'items/new.ejs',
    {
      category: req.params.catName
    }
  )
})

module.exports = items;
