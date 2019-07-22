'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    BlogModel = mongoose.model('Blogs');

exports.AddBlog = function (req, res) {
  var Blog = new BlogModel ({
    title : req.body.title,
    brief : req.body.brief,
    description : req.body.description,
    image : req.body.image,

      });
      Blog.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Blog Save :' + JSON.stringify(err, undefined, 2)); }
      });
    }
