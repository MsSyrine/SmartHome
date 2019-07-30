'use strict';

module.exports = function (app) {
  var homeController = require('../../../home/server/controller/home.server.controller');
  var users = require('../../../users/server/controllers/users.server.controller');
  var deviceController = require('../../../devices/server/controller/device.server.controller');
  
  app.route('api/home/')
    .get(homeController.list_home)
    .post(homeController.create_a_home);

  app.route('api/home/mydevices')
    .get(deviceController.list_all_devices)
    .post(deviceController.create_a_device);

  app.route('/api/home/mydevices/:deviceId')
    .put(deviceController.update_a_device)
    .delete(deviceController.delete_a_device)
    .get(deviceController.find_a_device);

  app.route('/api/home/mydevices/:deviceId/action')
    .put(deviceController.update_device_state);

  app.param('userId', users.userByID);
  app.param('homeId', homeController.homeByID);
};
