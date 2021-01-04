const express = require('express');
const Category = require('../models/category.js');
const categories = express.Router();

// NEW
categories.get('/new', (req, res) => {
  res.render(
    'categories/new.ejs'
  )
})

//CREATE
categories.post('/', (req,res) => {
  Category.create(req.body,  (err, createdCategory) => {
    res.redirect('/category')
  })
})

//INDEX
categories.get('/', (req,res) => {
  Category.find({}, (err, allCategories) => {
    res.render(
      'categories/index.ejs', {
        categories: allCategories
      })
    })
})

// SHOW
categories.get('/:id', (req, res) => {
  Category.findById(req.params.id, (error, foundCategory) => {
    res.render('categories/show.ejs', {
      category: foundCategory
    })
  })
})

// DELETE
categories.delete('/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id, (err, deletedCategory) => {
    res.redirect('/category')
  })
})


module.exports = categories;
