'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  chalk = require('chalk'),
  Schema = mongoose.Schema;


var SceneSchema = new Schema({
  id_scene: {
    type: String,
    required: 'Fill in a scene ID',
    index: {
      unique: true,
      sparse: true
    },
    scene_element: [{
      action: {
        type: String,
        required: 'Fill in a scene action'
      },
      timestamp: {
        type: Date,
        required: 'Fill in a scene action'
      }
    }],
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: 'Fill in a product'
    }
  }
});

module.exports = mongoose.model('Scene', SceneSchema);

/**
* Seeds the User collection with document (Scene)
* and provided options.
*/
function seed(doc, options) {
  var Scene = mongoose.model('Scene');

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
        Scene
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

            // Remove Scene (overwrite)

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
            message: chalk.yellow('Database Seeding: Scene\t' + doc.id_scene + ' skipped')
          });
        }

        var Scene = new Scene(doc);

        Scene.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Scene\t' + Scene.id_scene + ' added'
          });
        });
      });
    }
  });
}
