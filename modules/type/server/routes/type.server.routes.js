'use strict';

module.exports = function (app) {
  var TypeController = require('../controller/type.server.controller');
  var users = require('../../../users/server/controllers/users.server.controller');

  app.route('/api/devices/type')
    .get(TypeController.list_all_types)
    .post(TypeController.create_a_type);

  app.route('/api/devices/type/:id')
    .delete(TypeController.delete_a_typet)
    .get(Typeontroller.find_a_type);

  app.param('userId', users.userByID);
};
