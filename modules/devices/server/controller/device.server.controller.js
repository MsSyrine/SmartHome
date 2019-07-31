'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    deviceModel = mongoose.model('Device'),
    ProductModel = mongoose.model('Product'),
    userModel = mongoose.model('User'),
    TypeModel = mongoose.model('Type');
    const CircularJSON = require('circular-json');


//the device must be verified with the products collection
exports.create_a_device = function (req, res) {
  var Product = new ProductModel(ProductModel.findOne({id_product : req.body.id_product}, function(err, doc) {
    if (!err) { res.send(CircularJSON.stringify(doc));}
    else { console.log('Error in Retriving the Product :' + JSON.stringify(err, undefined, 2)); }
  }));
  var type = new TypeModel({name_type : req.body.name_type}) ;

  var device = new deviceModel ({
    mac_address: req.body.mac_address,
    serial_id: req.body.serial_id,
    state: req.body.state,
    version: req.body.version,
    product: Product,
    home: req.body.home,
    type_device: type
  });
  type.save((err, doc) => {
    if (!err) {
      res.send(doc);
    }
    else { console.log('Error in device Save :' + JSON.stringify(err, undefined, 2)); }
  });
  console.log(device);
  device.save((err, doc) => {
    if (!err) {
      res.send(doc);
    }
    else { console.log('Error in device Save :' + JSON.stringify(err, undefined, 2)); }
  });
}


exports.update_a_device = function (req,res){
  if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var device = new deviceModel ({
        mac_address: req.body.mac_address,
        serial_id: req.body.serial_id,
        state: req.body.state,
        version: req.body.version,
        product: req.body.product,
        home: req.body.home,
        type_device: req.body.price,
        });
    deviceModel.findByIdAndUpdate(req.params.id, { $set: device }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in device Update :' + JSON.stringify(err, undefined, 2)); }
    });
}

exports.delete_a_device = function (req,res){
 /* if (!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params.id}`);*/

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
  /*if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);*/

  deviceModel.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retriving the device :' + JSON.stringify(err, undefined, 2)); }
  });
}

exports.update_device_state = function (req,res){
 /* if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No device record with given id : ${req.params.id}`);*/

    var device = new deviceModel ({
        state : req.body.state
        });

    deviceModel.findByIdAndUpdate( {_id:req.params.id}, { state: device.state }, { new: true }, (err, doc) => {
        if (!err) {
          res.send(doc);
          //redirects to '/api/home/mydevices/:req.params.serial_id'
				res.redirect(`/api/home/mydevices/:${req.params.id}`);
        }
        else { console.log('Error in updating the device\'s state :' + JSON.stringify(err, undefined, 2)); }
    });
}


exports.find_a_device = function (req,res){
  /*if (!ObjectId.isValid(req.params.serial_id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);*/
        product.find({_id : req.params.id }, function (err, docs) {
          if (!(docs.length)){
            var err = new Error('A Device with that id is not registered within our products. Please verify your device credentials..')
            err.status = 400;
            return next(err);
          }
          else{
              device.save(err => {
                if (err) {
                //  console.log('Error in device Save :' + JSON.stringify(err, undefined, 2));
                  return res.status(500).send(err);
                }
                return res.status(200).send(device);
              });
            }
          });
}
