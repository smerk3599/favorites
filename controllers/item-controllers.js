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

//CREATE
items.post('/:catName', (req,res) => {
  Item.create(req.body,  (err, createdItem) => {
    res.redirect(`/item/${req.params.catName}`)
  })
})

//INDEX
items.get('/:foundCategory', (req, res) => {
  Item.find({category: req.params.foundCategory}, 'name rank', (err, categoryItems) => {
  // const sortedItems = categoryItems.sort({rank: 1});
  console.log(categoryItems);
  res.render(
    'items/index.ejs',
    {
      category: req.params.foundCategory,
      groupItems: categoryItems
    })
  })
})

// DELETE
items.delete('/:id/:catName', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, deletedItem) => {
    res.redirect(`/item/${req.params.catName}`)
  })
})

// UPDATE RANK UP
items.put('/rankup/:catName/:rank', (req, res) => {
  if (req.params.rank > 1) {
    console.log(req.params.rank);
    const shiftItemRank = req.params.rank - 1;
    Item.findOneAndUpdate({'rank': shiftItemRank}, {$inc: {rank: 1}}, {new: true}, (err, updatedModel) => {
      console.log('shift!');
      Item.findOneAndUpdate({'rank': req.params.rank}, {$inc: {rank: -1}}, {new: true}, (err, updatedModel) => {
      res.redirect(`../../${req.params.catName}`);
      })
    })
  }
})

module.exports = items;
