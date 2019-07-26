'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  chalk = require('chalk'),
  Schema = mongoose.Schema;

var TypeDeviceSchema = new Schema({
  id_type: {
    type: String,
    required: 'Fill in a type device ID',
    lowercase: true,
    trim: true,
    index: {
      unique: true,
      sparse: true
    }
  },
  name_type: {
    type: String,
    required: 'Fill in a type device name'
  }
});

module.exports = mongoose.model('Type', TypeDeviceSchema);

/**
* Seeds the User collection with document (Type)
* and provided options.
*/
function seed(doc, options) {
  var Type = mongoose.model('Type');

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
        Type
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

            // Remove Type (overwrite)

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
            message: chalk.yellow('Database Seeding: Type\t' + doc.name_type + ' skipped')
          });
        }

        var Type = new Type(doc);

        Type.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Type\t' + Type.name_type + ' added'
          });
        });
      });
    }
  });
}
