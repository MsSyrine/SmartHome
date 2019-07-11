'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,
  ProductModel = require('product')

var UpdateSchema = new Schema({
  id_update: {
    type: Number,
    required: 'Fill in an update ID',
    index: {
      unique: true,
      sparse: true
    }
  },
  update_date: {
    type: Date,
    required: 'Fill in an update date',
    default: Date.now
  },
  version: {
    Type: String,
    required: 'Fill in an update version'
  },
  author: {
    Type: String,
    required: 'Fill in an update author'},
  description: {
    Type: String,
    required: 'Fill in an update description'},
  data: {
    Type: String,
    required: 'upload the update'
  },
  product:
  {
    type: ProductModel,
    require: 'Fill in a product'
  }
})
