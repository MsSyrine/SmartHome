'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  mac_address: {
    type: String,
    unique: true,
    required: 'Fill in the device MAC ADDRESS'
  },
  serial_id: {
    type: String,
    required: 'Fill in the device serial ID',
    index: true
  },
  state: {
    type: String,
    required: 'Fill in the device state'
  },
  version: {
    type: String,
    required: 'Fill in the current version'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: 'Fill in the product reference'
  },
  type_device: {
    type: Schema.Types.ObjectId,
    ref: "Type"
    //required: 'Fill in the device type'
  },
  home: { type: Schema.ObjectId, ref: 'Home' }
});
const Device = mongoose.model('Device', DeviceSchema, 'devices');
module.exports = Device;
// module.exports = mongoose.model('Device', DeviceSchema);
