'use strict';

module.exports = function (app) {
  var homeController = require('../../../home/server/controller/home.server.controller'),
  homesPolicy = require('../policies/home.server.policy'),
  deviceController = require('../../../devices/server/controller/device.server.controller'),
  mongoose = require('mongoose');

/*------------Home Management---------------------*/
  app.route('/api/homes/').all(homesPolicy.isAllowed)
    .get(homeController.listHomes)
    .post(homeController.createHome);

  app.route('/api/homes/:homeId')
    .get(homeController.listHome);

/*------------Home Devices Management---------------------*/
// ADD a device to a home(using homeId)
  app.route('/api/homes/:homeId/devices')
  .get(homeController.getHomeWithDevices)
  .post(homeController.addDevices);
  
  app.route('/api/homes/:homeId/devices/:device_id')
  .put(deviceController.updateDevice)
  .delete(deviceController.deleteDevice)
  .get(deviceController.findDevice);

  app.route('/api/homes/:homeId/devices/:device_id/action')
  .put(deviceController.updateDeviceState);
/*------------Home Owners Management---------------------*/
  app.route('/api/homes/:homeId/owners')
// list home owners
  .get(homeController.getHomeWithOwners)
// Add a user/owner to a home
  .post(homeController.addOwner);

  // Finish by binding the article middleware
  app.param('homeId', homeController.homeById);
};
