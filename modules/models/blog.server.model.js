'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,
  UserModel = require('./user.server.model')

var BlogSchema = new Schema({
  id_post: {
    type: String,
    index: {
      unique: true,
      sparse: true
    },
    lowercase: true,
    trim: true,
    required: 'Fill in a post ID'
  },
  title: {
    type: String,
    maxlength: 50,
    required: 'Fill in a post title'
  },
  brief: {
    type: String,
    required: 'Fill in a post brief description'
  },
  description: {
    type: String,
    required: 'Fill in a post long description'
  },
  image: [{ type: String }],
  shares: {
    type: Number
  },
  likes: [{ type: UserModel }],
  comments: [{ type: UserModel }, { type: String ,}, { type: Date, default : Date.now}],
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: UserModel,
    required: 'Fill in a post author'
  }
});

var  blog = mongoose.model('Blog', BlogSchema);
 
module.exports = blog;
