'use strict';

module.exports = function (app) {

  var deviceController = require('../controller/device.server.controller');
  var user  = require('../../../users/server/controllers/users.server.controller');
  var home = require('../../../home/server/controller/home.server.controller');



  app.route('/api/devices/')
    .get(deviceController.list_all_devices)
    .post(deviceController.create_a_device);

  app.route('/api/devices/:id')
    .put(deviceController.update_a_device)
    .delete(deviceController.delete_a_device)
    .get(deviceController.find_a_device);

  app.param('userId', user.userByID);
  app.param('homeId', home.homeByID);
}
