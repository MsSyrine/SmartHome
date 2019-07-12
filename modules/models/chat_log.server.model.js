'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,
  UserModel = require('./user.server.model'),

var ChatSchema = new Schema({
  chat_id: {
    type: String,
    trim: true,
    lowercase: true,
    index: {
      unique: true,
	  sparse : true 
    }
  },
  message: {
    type: String,
    default : 'Default message here - INOTEK '
  },
  message_date: {
    type: Date,
    default: Date.now
  },
  sender: {
    type: UserModel,
	default : null
  },
  receiver: {
    type: UserModel,
	default : null
  }
})
