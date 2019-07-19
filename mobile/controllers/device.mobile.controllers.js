'use strict';

/**
 *
 * Module dependencies
 *
 */

var path = require('path'),
    http = require('http'),
    mongoose = require('mongoose'),
    User = require('../../server/models/user.server.model'),
    _ = require('lodash'),
    Device = require('../../server/models/device.server.model');

      var DeviceModel = mongoose.model('Device',Device);
/**
 *
 * Listing all devices
 *
 */

 module.exports.alldevices = function(req,res){

 }

 /**
  *
  * Listing a single user devices
  *
  */

  module.exports.userdevices = function(req,res){

  }

  /**
   *
   * Listing a single user device
   *
   */

   module.exports.mydevice = function(req,res){

   }

   /**
    *
    * Listing a single device scenes
    *
    */

  module.exports.listscenes = function(req,res){

  }

  /**
   *
   * Listing a single device's single scene's actions
   *
   */

  module.exports.listactions = function(req,res){

  }

  /**
   *
   * Sending a device's update to MQTT server
   *
   */

  module.exports.mqtt_device_update = function (req,res){

  }
