'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  Schema = mongoose.Schema,
  validator = require('validator'),
  chalk = require('chalk');

var ProductSchema = new Schema({
  id_product: {
    type: String,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    }
  },
  image: {},
  version: {},
  description: {},
  stock: {}
})
