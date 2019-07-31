'use strict';

/**
 * Module dependencies
 */

var path = require('path'),
  mongoose = require('mongoose'),
  Typemodel = mongoose.model('Type');

exports.create_a_type = function (req, res) {
  var type = new Typemodel(
    {
      name_type : req.body.name_type
    }
  );
  type.save((err, doc) => {
    if (!err) {
      res.send(doc);
    }
    else { console.log('Error in type device Save :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.delete_a_type = function(req,res){
  TypeModel.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in type device Delete :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.list_all_types = function (req,res){
  TypeModel.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving type devices :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.find_a_type = function (req,res){

  TypeModel.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retriving the device type :' + JSON.stringify(err, undefined, 2)); }
  });
}
