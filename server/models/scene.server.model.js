'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,
  ProductModel = require('./product.server.model'),


var SceneSchema = new Schema({
  id_scene: {
    type: String,
    required: 'Fill in a scene ID',
    index: {
      unique: true,
      sparse: true
    },
    scene_element: [{
      action: {
        type: String,
        required: 'Fill in a scene action'
      },
      timestamp: {
        type: Date,
        required: 'Fill in a scene action'
      }
    }],
    product: {
      type: ProductModel.product,
      required: 'Fill in a product'
    }
  }
});

var scene = mongoose.model('Scene', SceneSchema);
 
module.exports = scene;
