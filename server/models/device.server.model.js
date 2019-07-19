'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,
  ProductModel = require('./product.server.model'),
  HomeModel = require('./home.server.model'),
  TypeDeviceModel = require('./type.server.model')

var DeviceSchema = new Schema({
  mac_address: {
    type: String,
    required: 'Fill in a device MAC ADDRESS'
  },
  serial_id: {
    type: String,
    required: 'Fill in a device serial ID'
  },
  state: {
    type: String,
    required: 'Fill in a device state'
  },
  version: {
    Type: String,
    required: 'Fill in an update version'
  },
  product: {
    type: ProductModel
  },
  home: {
    type: HomeModel,
    required: 'Fill in a device home'
  },
  type_device: {
    type: TypeDeviceModel
  }
});

var device = mongoose.model('Device', DeviceSchema);

module.exports = device;
