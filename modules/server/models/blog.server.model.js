'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  UserModel = require('./user.server.model'),
  path = require('path'),
  Schema = mongoose.Schema


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
  likes:  {type: Schema.Types.ObjectId, ref: "User"} ,
  comments: [ {type: Schema.Types.ObjectId, ref: "User"}, { type: String ,}, { type: Date, default : Date.now}],
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  author:  {type: Schema.Types.ObjectId, ref: "User" ,
    required: 'Fill in a post author'
  }
});

 
module.exports = mongoose.model('Blog', BlogSchema);


//must complete the seeds for the blog
