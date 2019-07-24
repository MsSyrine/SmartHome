'use strict';

module.exports = function (app) {
<<<<<<< HEAD
  var deviceController = require('../controllers/device.server.controller');
  var users = require('../controllers/user.server.controller');
  var home = require('../controllers/home.server.controller');
=======
  var ProductController = require('../controllers/device.server.controller');
  var users = require('../../users/server/controllers/users.server.controller');
>>>>>>> 6091e9210da5433634d4fd75b20df493e959dbc2


  app.route('/api/devices')
  .get(deviceController.list_all_devices)
  .post(deviceController.create_a_device);

  app.route('/api/devices/:id')
  .put(deviceController.update_a_device)
  .delete(deviceController.delete_a_device)
  .get(deviceController.find_a_device);






  app.param('homeId', home.homeByID);
}
