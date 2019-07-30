'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var HomeSchema = new Schema({
  id_home: {
    type: String,
    required: 'Fill in a home ID',
    lowercase: true,
    trim: true,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    }
  },
  home_label: {
    type: String,
    unique: 'Home label already exists',
    required: 'Please fill in a Label for your home',
    trim: true,
    default: ''
  },
  owners: [{
    username: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'Fill in an owner'
    },
    priority: {
      type: String,
      lowercase: true,
      trim: true,
      default: '0'
    },
    period: {
      type: Date
    }
}]
});

module.exports = mongoose.model('Home', HomeSchema);

HomeSchema.statics.seed = seed;
//seed functions To be verified !
/**
* Seeds the User collection with document (Home)
* and provided options.
*/
function seed(doc, options) {
  var Home = mongoose.model('Home');

  return new Promise(function (resolve, reject) {

    skipDocument()
/*       .then(findAdminUser) */
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

/*     function findAdminUser(skip) {
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
    } */

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Home
          .findOne({
            _id: doc._id
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

            // Remove Home (overwrite)

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
            message: chalk.yellow('Database Seeding: Home\t' + doc.id_home + ' skipped')
          });
        }

        var Home = new Home(doc);

        Home.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Home\t' + Home.id_home + ' added'
          });
        });
      });
    }
  });
}

var Home = mongoose.model('Home', HomeSchema);

module.exports = Home;
