'use strict';

module.exports = function (app) {
  var homeController = require('../../../home/server/controller/home.server.controller'),
  users = require('../../../users/server/controllers/users.server.controller'),
  deviceController = require('../../../devices/server/controller/device.server.controller'),
  mongoose = require('mongoose'),
  deviceModel = mongoose.model('Device'),
  TypeModel = mongoose.model('Type'),
  ProductModel = mongoose.model('Product'),
  UserModel = mongoose.model('User'),
  homeModel = mongoose.model('Home');

/*------------Home Management---------------------*/
  app.route('/api/homes/')
    .get(homeController.list_homes)
    .post(homeController.create_home);

  app.route('/api/homes/:home_id')
    .get(homeController.list_home);

/*------------Home Devices Management---------------------*/
// ADD a device to a home(using home_id)
  app.route('/api/homes/:home_id/devices')
    .get(homeController.getHomeWithDevices)
    .post(function(req, res) {
      let Product = ProductModel.findOne({id_product: req.body.id_product}, function(err, doc) {
      if (!err) { 
        console.log('%j',doc);
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
                      return res.status(500).json({
                        status: "Failed",
                        message: "Database Error",
                        data: err
                      });
                      } else {
                        console.log('new Device saved successfully');
                        return res.status(201).json({
                          status: "Success",
                          message: "Resources Are Created Successfully",
                          data: doc
                        });
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
  
  app.route('/api/homes/:home_id/devices/:device_id')
  .put(deviceController.update_a_device)
  .delete(deviceController.delete_a_device)
  .get(deviceController.find_a_device);

  app.route('/api/homes/:home_id/devices/:device_id/action')
  .put(deviceController.update_device_state);
/*------------Home Owners Management---------------------*/
  app.route('/api/homes/:home_id/owners')
// list home owners
  .get(homeController.getHomeWithOwners)
// Add a user/owner to a home
  .post(function(req, res) {
    var homeId = req.params.home_id; 
    let User_test = UserModel.findOne({username: req.body.username}, function(err, doc) {
    if (!err) { 
      var friend = {user: doc._doc._id, priority: req.body.priority , startdate: Date.now(), validuntil: (Date.now() + 2160*60*60*1000) };
      console.log('%j', friend);
      homeModel.findByIdAndUpdate({_id: homeId}, 
      { $addToSet: {'owners': friend}},
      { new: true ,upsert: true},
      function(err, doc) { 
        if (err) {
        console.log('error adding new User to home');
        console.log(err);
        return res.status(500).json({
          status: "Failed",
          message: "Database Error",
          data: err
      });
        } else {
        console.log('new user saved successfully');
        return res.status(201).json({
          status: "Success",
          message: "New user is added to owners Successfully",
          data: doc});
      }
      });
      //update the user's collection with the homeID
      UserModel.findByIdAndUpdate({username: req.body.username}, 
        { $set: {'home_id': homeId}},
        { new: true ,upsert: true},
        function(err, doc) { 
          if (err) {
          console.log('error updating the home ref in User');
          console.log(err);
          return res.status(500).json({
            status: "Failed",
            message: "error updating the home ref in User",
            data: err
          });
          } else {
            console.log('user home ref is updated Successfully');
            return res.status(201).json({
            status: "Success",
            message: "user home ref is updated Successfully",
            data: doc
            });
          }
        });
    }
    else { console.log('Error in Retriving the User :' + JSON.stringify(err, undefined, 2)); }
  });
  });

  app.param('homeId', homeController.homeByID);
};
