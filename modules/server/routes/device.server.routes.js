'use strict';

module.exports = function (app) {
  var ProductController = require('../controllers/device.server.controller');
  var users = require('../../users/server/controllers/users.server.controller');

  app.route('/api/device/add').post(deviceController.AddDevice);
  app.route('/api/device/update'.put(deviceController.UpdateDevice));
  app.route('/api/device/delete').delete(deviceController.DeleteDevice);
  app.route('/api/device').get(deviceController.ListDevice);
  app.route('/api/device/:id').get(deviceController.FindDeviceByID);


  app.param('userId', users.userByID);
}
