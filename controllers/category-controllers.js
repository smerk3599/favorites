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

// EDIT
categories.get('/edit/:id', (req, res) => {
  Category.findById(req.params.id, (error, foundCategory) => {
    res.render('categories/edit.ejs', {
      category: foundCategory
    })
  })
})

// SHOW
categories.get('/:id', (req, res) => {
  Category.findById(req.params.id, (error, foundCategory) => {
    res.redirect(`../item/${foundCategory.name}`)
  })
})

// DELETE
categories.delete('/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id, (err, deletedCategory) => {
    res.redirect('/category')
  })
})

//UPDATE
categories.put('/:id', (req,res) => {
  Category.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
    res.redirect('/category');
  })
})

module.exports = categories;
