'use strict';

module.exports = function (app) {
  var homeController = require('../../../home/server/controller/home.server.controller');
  var users = require('../../../users/server/controllers/users.server.controller');
  var deviceController = require('../../../devices/server/controller/device.server.controller');
  var mongoose = require('mongoose'),
  ObjectId = require('mongodb').ObjectID;
  const CircularJSON = require('circular-json');
var deviceModel = mongoose.model('Device'),
TypeModel = mongoose.model('Type'),
ProductModel = mongoose.model('Product'),
UserModel = mongoose.model('User'),
homeModel = mongoose.model('Home');

  app.route('/api/homes/')
    .get(homeController.list_homes)
    .post(homeController.create_home);

// ADD a device to a home(using home_id)
  app.route('/api/homes/:home_id/devices')
    .get(homeController.getHomeWithDevices);

  app.post('/api/homes/:home_id/devices', function(req, res) {
      let Product = ProductModel.findOne({id_product : req.body.id_product}, function(err, doc) {
      if (!err) { 
        res.send(CircularJSON.stringify(doc));
        var type = new TypeModel({name_type : req.body.name_type}) ;
        var newDevice  = new deviceModel ({
          mac_address: req.body.mac_address,
          serial_id: req.body.serial_id,
          state: req.body.state,
          version: req.body.version,
          product: doc._doc._id,
          type_device: type
          });
        var homeId = req.params.home_id;
        newDevice.home = homeId;
      // WHEN SAVING, WRAP THE REST OF THE CODE
      newDevice.save(function (err){
        if (err) {
              console.log('error saving new Device');
              console.log(err);
          } else {
              console.log('new Device saved successfully');
              homeModel.findOne({_id : homeId}, function(err, doc){
                console.log('%j',doc);
                console.log(typeof homeId);
                  doc.devices.unshift(newDevice._id);
                  doc.save(function (err){
                      if (err) {
                      console.log('error adding new Device to home');
                      console.log(err);
                      } else {
                      console.log('new Device saved successfully');
                      // res.redirect('/homes/');
                    }
                  });
              });
          }
        });
      }
      else { console.log('Error in Retriving the Product :' + JSON.stringify(err, undefined, 2)); }
      });
      
    });
/*---------------------------------------------*/

// Add a user/owner to a home
  app.post('/api/homes/:home_id/owners', function(req, res) {
    var homeId = req.params.home_id;
  //  var userId = 
  let User_test = UserModel.findOne({username: req.body.username}, function(err, doc) {
    if (!err) { 
  var friend = {doc, priority: '1' , startdate: Date.now(), validuntil: (Date.now() + 2160*60*60*1000) };
  console.log('%j', friend);
  
  homeModel.findByIdAndUpdate({_id: homeId}, 
   // { $push: { "owners.user": doc._doc._id, "owners.priority": req.body.priority}} , 
    {$push: {'owners': {'user._id': doc._doc._id}}},
      { new: true, safe: true, upsert: true },
      function(err, doc) { 
        if (err) {
        console.log('error adding new User to home');
        console.log(err);
        return res.status(500).json({
          status: "Failed",
          message: "Database Error",
          data: error
      });
        } else {
        console.log('new user saved successfully');
        return res.status(201).json({
          status: "Success",
          message: "Resources Are Created Successfully",
          data: doc
      });
      }
      });
    }
    else { console.log('Error in Retriving the User :' + JSON.stringify(err, undefined, 2)); }
  });
  });
// list home owners
  app.get('/api/homes/:home_id/owners', homeController.getHomeWithOwners);

  app.route('/api/home/:home_id/devices/:device_id')
    .put(deviceController.update_a_device)
    .delete(deviceController.delete_a_device)
    .get(deviceController.find_a_device);

  app.route('/api/home/:home_id/devices/:device_id/action')
    .put(deviceController.update_device_state);

  app.param('homeId', homeController.homeByID);
};
