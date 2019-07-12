'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,
  UserModel = require('./user.server.model'),

var HomeSchema = new Schema({
  id_home: {
    type: String,
    required: 'Fill in a home ID',
    lowercase: true,
    trim: true,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    }
  },
  owners: [{
    user: {
      type: UserModel,
      required: 'Fill in an owner'
    },
    priority: {
      type: String,
      lowercase: true,
      trim: true,
      default: '0'
    },
    period: {
      type: Date
    }]
});
