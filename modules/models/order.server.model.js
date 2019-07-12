'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,
  UserModel = require('./user.server.model'),
  ProductModel = require('./product.server.model')

var OrderSchema = new Schema({
  order_id: {
    type: String,
    trim: true,
    lowercase: true,
    index: {
      unique: true,
      sparse: true
    }
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  billing_address: {
    type: String,
    default: 'Default Address - Inotek'
  },
  delivery_address: {
    type: String,
    default: ' Default delivery_address'
  },
  total_price: {
    type: Number,
  },
  buyer: {
    type: UserModel
  },
  list_products: [{
    product: {
      type: ProductModel
    },
    quantity: {
      type: Number,
      validate: {
        validator: function (quantity) {
          return quantity <= 0;
        },
        message: 'Price must be set at a higher figure than 0'
      }
    }
  }]
});
