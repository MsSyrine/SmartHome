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
    required: 'Please fill in a product stock',
    validate: {
      validator: function (price) {
        return price <= 0;
      },
      message: 'stock must be set at a higher figure than 0'
    }
  },
  price: {
    type: Number,
    required: 'Please fill in a product price',
    validate: {
      validator: function (price) {
        return price <= 0;
      },
      message: 'Price must be set at a higher figure than 0'
    }
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});


var product = mongoose.model('Product', ProductSchema);
 
module.exports = product;

