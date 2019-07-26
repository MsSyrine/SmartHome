'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
mongoose = require('mongoose');

/**
 * Home middleware
 */

 //exports the home id,which we gonna need for linking devices to a user aka home owner
exports.homeByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'home id is invalid'
    });
  }
  
  Home.findOne({
    _id: id
  }).exec(function (err, home) {
    if (err) {
      return next(err);
    } else if (!home) {
      return next(new Error('Failed to load home ' + id));
    }
  
  req.profile = home;
  next();
  });
};  

/* 
exports.find_devices_by_home_id = function (req,res){
    if (!ObjectId.isValid(req.params.id))
          return res.status(400).send(`No record with given home id : ${req.params.id}`);
  
      homeModel.find(req.params.id, (err, doc) => {
          if (!err) { res.send(doc); }
          else { console.log('Error in Retriving thed home record:' + JSON.stringify(err, undefined, 2)); }
      });
  } */