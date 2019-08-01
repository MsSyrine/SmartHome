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
  console.log("********request  :*********" + req.body);
  var data = JSON.stringify(req.body);
// console.log("********label :*********" + data.home_label);
  console.log("request data :" + data);
  var obj = JSON.parse(data);
  var username = obj.owners[0].username;
  console.log("********obj username :*********" + obj.owners[0].username);
/*     var User_test = new UserModel(UserModel.findOne({username: username}, function(err, doc) {
      if (!err) { res.send(doc) }
      else { console.log('Error in Retriving the User :' + JSON.stringify(err, undefined, 2)); }
    }));
  console.log("user " + User_test );
    */
  UserModel.find({username: username }, function (err, docs) {
    if (!(docs.length)){
      console.log('this username is not registered . Please verify your user credentials..');
      return res.status(400).send(err);
    }
    else{
      var home = new homeModel ({
        id_home: req.body.id_home,
        home_label: req.body.home_label,
        owners: [{
          username: obj.owners[0].username,
          priority: obj.owners[0].priority 
        }]
      });

      console.log('home' + home);
      home.save(err => {
        if (err) {
          console.log('Error in home Saving :' + JSON.stringify(err, undefined, 2));
          return res.status(500).send(err);
        }
        return res.status(200).send(home);
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