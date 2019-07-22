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

exports.UpdateBlog = function (req, res){
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  var Blog = new BlogModel ({
    title : req.body.title,
    brief : req.body.brief,
    description : req.body.description,
    image : req.body.image,
  });
  BlogModel.findByIdAndUpdate(req.params.id, { $set: Blog }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Blog Update :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.DeleteBlog = function (req, res){
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  BlogModel.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Blog Delete :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.ListBlog = function (req, res){
  BlogModel.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving blogs :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.FindBlogByID = function (req, res){
  if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    BlogModel.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving the blog :' + JSON.stringify(err, undefined, 2)); }
    });
}
