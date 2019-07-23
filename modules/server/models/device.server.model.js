'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,
  ProductModel = require('./product.server.model'),
  HomeModel = require('./home.server.model'),
  TypeDeviceModel = require('./type.server.model')

var DeviceSchema = new Schema({
  mac_address: {
    type: String,
    required: 'Fill in a device MAC ADDRESS'
  },
  serial_id: {
    type: String,
    required: 'Fill in a device serial ID'
  },
  state: {
    type: String,
    required: 'Fill in a device state'
  },
  version: {
    type: String,
    required: 'Fill in an update version'
  },
  product: {type: Schema.Types.ObjectId,
    ref: "Product"
  },
  home: {type: Schema.Types.ObjectId,
    ref: "Home" ,
    required: 'Fill in a device home'
  },
  type_device: {type: Schema.Types.ObjectId,
    ref: "Type"
  }
});


DeviceSchema.statics.seed = seed;
module.exports =  mongoose.model('Device', DeviceSchema);


/**
* Seeds the User collection with document (Device)
* and provided options.
*/
function seed(doc, options) {
  var Device = mongoose.model('Device');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(findAdminUser)
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function findAdminUser(skip) {
      var User = mongoose.model('User');

      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve(true);
        }

        User
          .findOne({
            roles: { $in: ['admin'] }
          })
          .exec(function (err, admin) {
            if (err) {
              return reject(err);
            }

            doc.user = admin;

            return resolve();
          });
      });
    }

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Device
          .findOne({
            title: doc.title
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

            // Remove Device (overwrite)

            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Device\t' + doc.title + ' skipped')
          });
        }

        var Device = new Device(doc);

        Device.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Device\t' + Device.title + ' added'
          });
        });
      });
    }
  });
}
