'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
mongoose = require('mongoose'),
deviceModel = mongoose.model('Device'),
UserModel = mongoose.model('User'),
homeModel = mongoose.model('Home');
/**
 * Home middleware
 */
exports.list_home = function (req,res){
  homeModel.findOne({_id : req.params.home_id})
  .populate([{
    path: 'owners.user',
    model: 'User'
  }, {
    path: 'devices',
    model: 'Device'
}]).sort('-created').exec(function (err, articles) {
  if (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  } else {
    res.json(articles);
  }
});
}

exports.list_homes = function (req,res){
  homeModel.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving home details :' + JSON.stringify(err, undefined, 2)); }
  });
}
//the home must be verified with the username
exports.create_home = function (req, res) {
let User_test = UserModel.findOne({username: req.body.username}, function(err, doc) {
    if (!err) {     
  var home = new homeModel ({
    id_home: req.body.id_home,
    home_label: req.body.home_label,
    owners: [{
      user: doc._doc._id ,
      priority: req.body.priority
    }]  
  });   
      home.save((err, doc) => {
        if (!err) {
          res.json(doc);
          console.log('Home saved! ' + home);
        }
        else {
          console.log('Error in home Saving :' + JSON.stringify(err, undefined, 2)); }
    });
      return doc;
    }
    else { console.log('Error in Retriving the User :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.getHomeWithDevices = function ( req, res) {
  // Find and populate
  var homeId = req.params.home_id;
  homeModel.findOne({_id : homeId}).sort('-created')
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

exports.getHomeWithOwners = function ( req, res) {
  // Find and populate
  var homeId = req.params.home_id;
  homeModel.findOne({_id : homeId})
  .populate({
    path: 'owners.user',
    model: 'User'
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