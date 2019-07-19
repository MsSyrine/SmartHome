'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,
  DeviceModel = require('./device.server.model'),
  UserModel = require('./user.server.model')

var LogSchema = new Schema({
  id_log: {
    type: String,
    trim: true,
    lowercase: true,
    index: {
      unique: true,
      sparse: true
    }
  },
  device: {type: Schema.Types.ObjectId, 
    ref: "Device" 
  },
  user: {type: Schema.Types.ObjectId, 
    ref: "User" 
  },
  log_date: {
    type: Date,
    defaults: Date.now
  },
  action: {
    type: String,
    lowercase: true,
  },
  resultat: {
    type: String,
    lowercase: true
  }

});

 
module.exports =  mongoose.model('Log', LogSchema);