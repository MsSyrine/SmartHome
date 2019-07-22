'use strict';

module.exports = function (app) {
  var ProductController = require('../controllers/product.server.controller');
  var users = require('../controllers/users.server.controller');

  app.route('/api/product/add').post(ProductController.AddProduct);
  app.route('/api/product/update'.put(ProductController.UpdateProduct));
  app.route('/api/product/delete').delete(ProductController.DeleteProduct);
  app.route('/api/product').get(ProductController.ListProduct);
  app.route('/api/product/:id').get(ProductController.FindProductByID);


  app.param('userId', users.userByID);
}
