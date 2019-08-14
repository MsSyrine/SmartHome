'use strict';

module.exports = function (app) {

  var deviceController = require('../controller/device.server.controller');
  var user  = require('../../../users/server/controllers/users.server.controller');
  var home = require('../../../home/server/controller/home.server.controller');

  app.param('userId', user.userByID);
  app.param('homeId', home.homeByID);
}
