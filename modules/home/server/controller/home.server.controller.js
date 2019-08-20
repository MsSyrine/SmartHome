'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
mongoose = require('mongoose'),
errorHandler = require('../../../core/server/controllers/errors.server.controller')
deviceModel = mongoose.model('Device'),
UserModel = mongoose.model('User'),
homeModel = mongoose.model('Home');
/**
 * Home middleware
 */

exports.listHomes = function (req,res){
  homeModel.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving home details :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.listHome = function (req,res){
  homeModel.findOne({_id : req.params.homeId})
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

//specify the main owner when creating the home 
exports.createHome = function (req, res) {
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
          res.json(err);
    });
      return doc;
    }
    else { console.log('Error in Retriving the User :' + JSON.stringify(err, undefined, 2)); }
  });
}
/*------------Home Devices Management---------------------*/
exports.addDevices = function ( req, res)  {
  var type_device = req.body.type_device;
    let Product = ProductModel.findOne({id_product: req.body.id_product}, function(err, doc) {
    if (!err) { //houni tabda el find ta3 product
  //    console.log('%j',doc);
      TypeModel.findOne({name_type: type_device}, function(err, type) {
  //      console.log('%j',type);
        if (!err){
          var newDevice  = new deviceModel ({
            mac_address: req.body.mac_address,
            serial_id: req.body.serial_id,
            state: req.body.state,
            version: req.body.version,
            product: doc._doc._id,
            type_device: type._id
          });
        }
    else{
      console.log(err);console.log('Error in Retriving the Type :' + JSON.stringify(err, undefined, 2)); 
    }
      var homeId = req.params.homeId;
      newDevice.home = homeId;
    // WHEN SAVING, WRAP THE REST OF THE CODE
      newDevice.save(function (err){
      if (err) {
            console.log('error saving new Device');console.log(err);
        } else {
            console.log('new Device saved in Device Schema successfully');
            homeModel.findOne({_id : homeId}, function(err, doc){
              console.log('%j',doc);
             // console.log(typeof homeId);
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
                      console.log('new Device added to home document successfully');
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
  });
  }
  else { console.log('Error in Retriving the Product :' + JSON.stringify(err, undefined, 2)); }
    });  
  }

exports.getHomeWithDevices = function ( req, res) {
  // Find and populate
  var homeId = req.params.homeId;
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
/*------------Home Owners Management---------------------*/
exports.addOwner = function ( req, res) {
  var homeId = req.params.homeId; 
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
}

exports.getHomeWithOwners = function ( req, res) {
  console.log("params*************** " + req.params.homeId);
  // Find and populate
  var homeId = req.params.homeId;
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
exports.homeById = function (req, res, next, id) {
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