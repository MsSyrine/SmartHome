'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
mongoose = require('mongoose'),
homeModel = mongoose.model('Home'),
user = mongoose.model('User');


/**
 * Home middleware
 */

exports.list_home = function (req,res){
  homeModel.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving home details :' + JSON.stringify(err, undefined, 2)); }
  });
}
//the device must be verified with the products collection
exports.create_a_home = function (req, res) {
  var device = new deviceModel ({
  id_home: req.body.id_home,
  home_label: req.body.home_label,
  owners: [{
    username: req.body.owners.username,
    priority: req.body.owners.priority,
    period: req.body.owners.period,
  }]
  });
    user.find({username : home.owners.username }, function (err, docs) {
        if (!(docs.length)){
          var err = new Error('A user with that id is not registered . Please verify your user credentials..')
          err.status = 400;
          return next(err);
        }
          else{
            home.save(err => {
              if (err) {
              //  console.log('Error in device Save :' + JSON.stringify(err, undefined, 2));
                return res.status(500).send(err);
              }
              return res.status(200).send(device);
            });

        }
    });
}
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