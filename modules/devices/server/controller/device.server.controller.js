'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    deviceModel = mongoose.model('Device'),
    homeModel = mongoose.model('Home'),
    TypeModel = mongoose.model('Type');
const CircularJSON = require('circular-json');


exports.updateDevice = function (req,res){
/*   if (!ObjectId.isValid(req.params.device_id))
    return res.status(400).send(`No record with given id : ${req.params.device_id}`); */
    //make sure to specify the type of the device in the post request
    TypeModel.findOne({name_type: type_device}, function(err, type) {
      if (!err){
      //      console.log('%j',type);
    var device = new deviceModel ({
      mac_address: req.body.mac_address,
      serial_id: req.body.serial_id,
      state: req.body.state,
      version: req.body.version,
      product: req.body.product,
      type_device: type._id
      });
    }
    else{
      console.log(err);console.log('Error in Retriving the Type :' + JSON.stringify(err, undefined, 2)); 
    }
    deviceModel.findByIdAndUpdate(req.params.device_id, { $set: device }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in device Update :' + JSON.stringify(err, undefined, 2)); }
    });
    });
}

exports.deleteDevice = function (req,res){
/* if (!ObjectId.isValid(req.params.device_id))
  return res.status(400).send(`No record with given id : ${req.params.id}`);*/
  var homeID = req.params.home_id;
  var deviceID = req.params.device_id;
  console.log('homeID: '+homeID);
  console.log('deviceID: '+deviceID);

  deviceModel.findByIdAndRemove(deviceID, (err, doc) => {
    if (!err) { 
      homeModel.findByIdAndUpdate(homeID, { $pull: { devices:  deviceID  } }, 
        { new: true },
      function (err, doc) {
        if (!err) {
          res.status(200).send(doc);
                  } 
        else {
          res.render('error', { error: err })
              }
      });
    }
    else{
      console.log(err)
      }
    });  
}

exports.listDevices = function (req,res){
  deviceModel.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving devices :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.findDevice = function (req,res){
  /*if (!ObjectId.isValid(req.params.device_id))
        return res.status(400).send(`No record with given id : ${req.params.device_id}`);*/
  deviceModel.findById(req.params.device_id, (err, doc) => {
    if (!err) { 
      return res.status(200).json({
        status: "Success",
        message: "Device is found Successfully",
        data: doc});
    }
    else { 
      console.log('Error in Retriving the device :' + JSON.stringify(err, undefined, 2));;
      return res.status(400).json({
        status: "Failed",
        message: "Database Error",
        data: err
    });
    }
  });
}

exports.updateDeviceState = function (req,res){
/* if (!ObjectId.isValid(req.params.device_id))
        return res.status(400).send(`No device record with given id : ${req.params.device_id}`);*/
    var device = new deviceModel ({
        state : req.body.state
        });
    deviceModel.findByIdAndUpdate( {_id:req.params.device_id}, { state: device.state }, { new: true }, (err, doc) => {
        if (!err) {
          res.send(doc);
				//res.redirect(`/api/homes/:home_id/devices/:${req.params.device_id}`);
        }
        else { console.log('Error in updating the device\'s state :' + JSON.stringify(err, undefined, 2)); }
    });
}