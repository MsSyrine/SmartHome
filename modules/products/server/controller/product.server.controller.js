'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  ProductModel = mongoose.model('Product');

exports.create_a_product = function (req, res) {
  var product = new ProductModel({
    id_product: req.body.id_product,
    product_name: req.body.product_name,
    image: req.body.image,
    version: req.body.version,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price
  });
  product.save((err, doc) => {
    if (!err) {
      res.send(doc);
    }
    else { console.log('Error in Product Save :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.update_a_product = function (req, res) {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  var product = new ProductModel ({
    id_product: req.body.id_product,
    product_name: req.body.product_name,
    image: req.body.image,
    version: req.body.version,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price
    });

  ProductModel.findByIdAndUpdate(req.params.id, { $set: product }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.delete_a_product = function (req, res) {
  if (!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params.id}`);

  ProductModel.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Product Delete :' + JSON.stringify(err, undefined, 2)); }
  });
};

exports.list_products = function (req, res) {
  ProductModel.find((err, docs) => {
  if (!err) { 
    res.send(docs);
   }
  else { console.log('Error in Retriving products :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.find_a_product_by_id = function (req,res){
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  ProductModel.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
   else { console.log('Error in Retriving the product :' + JSON.stringify(err, undefined, 2)); }
  });
}
