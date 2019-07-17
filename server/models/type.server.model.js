'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,

var TypeDeviceSchema = new Schema({
  id_type: {
    type: String,
    required: 'Fill in a type device ID',
    lowercase: true,
    trim: true,
    index: {
      unique: true,
      sparse: true
    }
  },
  name_type: {
    type: String,
    required: 'Fill in a type device name'
  }
});

var type= mongoose.model('Type', TypeDeviceSchema);
 
module.exports = type;