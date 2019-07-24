'use strict';

module.exports = function (app) {
  var BlogController = require('../controllers/blog.server.controller'),
  users = require('../../users/server/controllers/users.server.controller');

  app.route('/api/blog/add').get(BlogController.AddBlog);
  app.route('/api/blog/update').put(BlogController.UpdateBlog);
  app.route('/api/blog/delete').delete(BlogController.DeleteBlog);
  app.route('/api/blog').get(BlogController.ListBlog);
  app.route('/api/product/:id').get(BlogController.FindBlogByID);

  app.param('userId', users.userByID);
}
