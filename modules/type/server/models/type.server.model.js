'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  chalk = require('chalk'),
  Schema = mongoose.Schema;

var TypeDeviceSchema = new Schema({
  name_type: {
    type: String,
    unique: true,
    required: 'Fill in a type device name',
    index: true
  }
});

module.exports = mongoose.model('Type', TypeDeviceSchema);

