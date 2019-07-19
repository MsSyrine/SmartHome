'use strict';

/**
 * Module dependencies
 */

module.exports = function (app) {

  var device = require('../controllers/device.mobile.controllers'),
      user = require('../../modules/users/server/controllers/users.server.controller');

      // Setting up the device API routes

      app.route('/api/devices').get(device.alldevices); // all devices listing route
      app.route('/api/mydevices').get(device.userdevices); // a single user's devices listing route
      app.route('/api/mydevice').get(device.mydevice);  // a single user's single device route
      app.route('/api/mydevices/scenes').get(device.listscenes);  // a device's scenes listing route
      app.route('/api/mydevices/scenes/actions').get(device.listactions); // a device's scene's actions listing route
      app.route('/api/hq/update').post(device.mqtt_device_update); // sending an update to a device


      // Setting usefull parameters
      app.param('UserId',user.userByID);

}
