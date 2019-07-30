'use strict';

module.exports = function (app) {
  var ProductController = require('../controller/product.server.controller');
  var users = require('../../../users/server/controllers/users.server.controller');

  app.route('/api/products')
    .get(ProductController.list_products)
    .post(ProductController.create_a_product);

  app.route('/api/products/:id')
    .put(ProductController.update_a_product)
    .delete(ProductController.delete_a_product)
    .get(ProductController.find_a_product_by_id);

  app.param('userId', users.userByID);
};
