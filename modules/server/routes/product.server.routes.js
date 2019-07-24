'use strict';

module.exports = function (app) {
  var ProductController = require('../controllers/product.server.controller');
  var users = require('../controllers/users.server.controller');

  app.route('/api/products')
  .get(ProductController.list_products)
  .post(ProductController.create_a_product);

  app.route('/api/products/:id')
  .put(PoductController.update_a_product)
  .delete(ProductController.delete_a_product)
  .get(ProductController.find_a_product_by_id);


  app.param('userId', users.userByID);
}
