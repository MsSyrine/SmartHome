'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
mongoose = require('mongoose'),
homeModel = mongoose.model('Home'),
UserModel = mongoose.model('User');

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
exports.create_a_home = function (req, res) {
    var User_test = new UserModel(UserModel.findOne({username: req.body.owners.username}, function(err, doc) {
      if (!err) { res.send(CircularJSON.stringify(doc)) }
      else { console.log('Error in Retriving the User :' + JSON.stringify(err, undefined, 2)); }
    }));
    console.log("request :" + req.body);
    console.log("user " + User_test );
    var home = new homeModel ({
      id_home : req.body.id_home,
      home_label : req.body.home_label,
      owners : [{
        username: User_test.email,
        priority: req.body.owners.priority
/*         startdate: req.body.owners.startdate,
        validUntil: req.body.owners.validuntil */
      }]
    });
    console.log("home credentials " + home );
      home.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Home Save :' + JSON.stringify(err, undefined, 2)); }
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