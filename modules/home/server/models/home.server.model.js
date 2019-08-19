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
  //  unique: 'Home label already exists',
    required: 'Please fill in a Label for your home',
    trim: true
  },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
  //  required: 'Please fill in a device your home'
  }],
  owners: [{
    user: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
  //    required: 'Fill in an owner'
    },
    priority: {
      type: Number,
      trim: true,
      default: '0'
    },
    startdate: {
      type: Date,
    //  required: true,
      default: Date.now
    }, 
    validUntil: {
      type: Date,
/*       validate: {
        validator: function (validuntil) {
          return validuntil >= startdate;
        },
        message: 'end date must be set at a higher date than the start date '
      }, */
      default: () => Date.now() + 2160*60*60*1000 // 90 days from now
    } 
  }]
}, { usePushEach: true });
const Home = mongoose.model('Home', HomeSchema , 'homes');
module.exports = Home;

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
