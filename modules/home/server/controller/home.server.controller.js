'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
mongoose = require('mongoose'),
deviceModel = mongoose.model('Device'),
UserModel = mongoose.model('User'),
homeModel = mongoose.model('Home');

/* const homeModel = require('../models/home.server.model');
const UserModel = require('../../../users/server/models/user.server.model');
const deviceModel = require('../../../devices/server/models/device.server.model'); */

const CircularJSON = require('circular-json');
/**
 * Home middleware
 */
exports.list_home = function (req,res){
  homeModel.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving home details :' + JSON.stringify(err, undefined, 2)); }
  });
}
//the home must be verified with the username
exports.create_home = function (req, res) {
var User_test =new UserModel(UserModel.findOne({username: req.body.username}, function(err, doc) {
    if (!err) { console.log(CircularJSON.stringify(doc)) }
    else { console.log('Error in Retriving the User :' + JSON.stringify(err, undefined, 2)); }
  }));
  var home = new homeModel ({
    id_home: req.body.id_home,
    home_label: req.body.home_label,
/*         devices:  [ device_test._id ], */
    owners: [{
      user: User_test._id,
      priority: req.body.priority
    }] 
  });   
  req.body.devices.forEach(function(device) {
    var dev = new deviceModel(deviceModel.findOne({serial_id: device}, function(err, doc) {
      if (!err) { 
        console.log(CircularJSON.stringify(doc));
      }
      else { console.log('Error in Retriving the device :' + JSON.stringify(err, undefined, 2)); }
      }));
      home.devices.push(dev._id );
  });
      home.save((err, doc) => {
        if (!err) {
          res.json(doc);
          console.log('Home saved! ' + home);
        }
        else {
          console.log('Error in home Saving :' + JSON.stringify(err, undefined, 2)); }
    });
}

exports.getHomeWithDevices = function ( req, res) {
  // Find and populate
  homeModel.find({id_home: req.params.id}).sort('-created')
  .populate({
    path: 'devices',
    model: 'Device'
  })
  .exec(function (err, articles) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
}

 //exports the home id
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