'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema;

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
    type: String,
    required: 'Fill in an update version'
  },
  author: {
    type: String,
    required: 'Fill in an update author'
  },
  description: {
    type: String,
    required: 'Fill in an update description'
  },
  data: {
    type: String,
    required: 'upload the update'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    require: 'Fill in a product'
  }
});

module.exports = mongoose.model('Update', UpdateSchema);
