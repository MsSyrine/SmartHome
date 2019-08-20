'use strict';

module.exports = function (app) {
  var ProductController = require('../controller/product.server.controller');
  var users = require('../../../users/server/controllers/users.server.controller');

  app.route('/api/products/')
    .get(ProductController.listProducts)
    .post(ProductController.createProduct);

  app.route('/api/products/:product_id')
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct)
    .get(ProductController.findProductById);

  app.param('userId', users.userByID);
};
