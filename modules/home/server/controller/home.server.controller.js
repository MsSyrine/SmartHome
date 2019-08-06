'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
mongoose = require('mongoose'),
homeModel = mongoose.model('Home'),
deviceModel = mongoose.model('Device'),
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
exports.create_home = function (req, res) {
  var User_test = new UserModel(UserModel.findOne({username: req.body.username}, function(err, doc) {
    if (!err) { console.log(CircularJSON.stringify(doc)) }
    else { console.log('Error in Retriving the User :' + JSON.stringify(err, undefined, 2)); }
  }));
  var device_test = new deviceModel(deviceModel.findOne({serial_id :req.body.devices[0].serial_id}, function(err, doc) {
    if (!err) { console.log(CircularJSON.stringify(doc));}
    else { console.log('Error in Retriving the device :' + JSON.stringify(err, undefined, 2)); }
  }));
      var home = new homeModel ({
        id_home: req.body.id_home,
        home_label: req.body.home_label,
        devices:  [{  
          serial_id: device_test._id
        }],
        owners: [{
          user: User_test._id,
          priority: req.body.priority
        }]
      });
      console.log('home***************' + home);
      home.save((err, doc) => {
        if (!err) {
          console.log('Home saved! ' + home);
        }
        else {
          console.log('Error in home Saving :' + JSON.stringify(err, undefined, 2)); }
    });
}

exports.list = async function (req, res) {
  const home = await homeModel.find({id_home: req.params.id})
  .populate({ 
    path: 'owners',
    model: 'User'
  });
  console.log('%j', home);
  res.send(CircularJSON.stringify(home));
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