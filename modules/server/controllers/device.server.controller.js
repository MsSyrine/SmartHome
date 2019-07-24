'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    deviceModel = mongoose.model('Device');
    userModel = mongoose.model('User');

exports.create_a_device = function (req, res) {
  var device = new deviceModel ({
    mac_address: req.body.mac_address,
    serial_id: req.body.serial_id,
    state : req.body.state,
    version : req.body.version,
    product : req.body.product,
    home : req.body.home,
    type_device : req.body.price,
  });
  device.save((err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in device Save :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.update_a_device = function (req,res){
  if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var device = new deviceModel ({
        mac_address: req.body.mac_address,
        serial_id: req.body.serial_id,
        state : req.body.state,
        version : req.body.version,
        product : req.body.product,
        home : req.body.home,
        type_device : req.body.price, 
        });
    deviceModel.findByIdAndUpdate(req.params.id, { $set: device }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in device Update :' + JSON.stringify(err, undefined, 2)); }
    });
}

exports.delete_a_device = function (req,res){
  if (!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params.id}`);

  deviceModel.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in device Delete :' + JSON.stringify(err, undefined, 2)); }
});
}

exports.list_all_devices = function (req,res){
  deviceModel.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in Retriving devices :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.find_a_device = function (req,res){
  if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    deviceModel.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving the device :' + JSON.stringify(err, undefined, 2)); }
    });
}

