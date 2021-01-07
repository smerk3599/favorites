const express = require('express');
const Item = require('../models/fav-item.js');
const items = express.Router();

// NEW
items.get('/new/:catName', (req, res) => {
  Item.find({category: req.params.catName}, 'name', (err, categoryItems) => {
    res.render(
      'items/new.ejs',
      {
        category: req.params.catName,
        groupItems: categoryItems
      }
  )
  })
})

// EDIT
items.get('/edit/:catName/:id', (req, res) => {
  Item.findById(req.params.id, (error, foundItem) => {
    res.render('items/edit.ejs', {
      item: foundItem,
      category: req.params.catName
    })
  })
})

// SHOW
items.get('/:catName/:id', (req, res) => {
    Item.findById(req.params.id, (error, foundItem) => {
      res.render('items/show.ejs', {
        item: foundItem,
        category: req.params.catName
      })
    })
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
items.put('/rankup/:catName/:rank/:id', (req, res) => {
  const intRank = parseInt(req.params.rank);
  let shiftItemRank = 0;
  console.log(intRank);
  if (intRank > 1) {
    shiftItemRank = intRank - 1;
    console.log(shiftItemRank);
    Item.findOneAndUpdate({rank: shiftItemRank}, {$inc: {rank: 1}}, {new: true}, (err, updatedModel) => {})
    Item.findByIdAndUpdate(req.params.id, {$inc: {rank: -1}}, {new: true}, (err, newModel) => {
      res.redirect(`../../../${req.params.catName}`);
    })
  } else {
    res.redirect(`../../../${req.params.catName}`);
  }
})

// UPDATE RANK DOWN
items.put('/rankdown/:catName/:rank/:arrayLength/:id', (req, res) => {
  const intRank = parseInt(req.params.rank);
  const intArrLength = parseInt(req.params.arrayLength);
  let shiftItemRank = 0;
  console.log(intRank);
  console.log(intArrLength);
  if (intRank < intArrLength) {
    shiftItemRank = intRank + 1;
    console.log(shiftItemRank);
    Item.findOneAndUpdate({rank: shiftItemRank}, {$inc: {rank: -1}}, {new: true}, (err, updatedModel) => {})
    Item.findByIdAndUpdate(req.params.id, {$inc: {rank: 1}}, {new: true}, (err, newModel) => {
      res.redirect(`../../../../${req.params.catName}`);
    })
    // })
  } else {
    res.redirect(`../../../../${req.params.catName}`);
  }
})

module.exports = items;
