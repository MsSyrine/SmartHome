'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,

var ProductSchema = new Schema({
  id_product: {
    type: String,
    required: 'Please fill in a product UIK',
    index: {
      unique: true,
      sparse: true
    }
  },
  product_name: {
    type: String,
    unique: 'Product name already exists',
    required: 'Please fill in a product name',
    trim: true,
    default: ''
  },
  image: {
    type: String,
    required: 'Please upload a product image',
    trim: true
  },
  version: {
    type: String,
    required: 'Please fill in a product version',
    trim: true
  },
  description: {
    type: String,
    required: 'Please fill in a product description'
  },
  stock: {
    type: Number,
    required: 'Please fill in a product stock'
  },
  price: {
    type: Number,
    min : 0,
    required: 'Please fill in a product price',
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});
