'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,
  UserModel = require('./user.server.model'),
  ProductModel = require('./product.server.model')

var OrderSchema = new Schema({
  order_id: {
    type: String,
    trim: true,
    lowercase: true,
    index: {
      unique: true,
      sparse: true
    }
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  billing_address: {
    type: String,
    default: 'Default Address - Inotek'
  },
  delivery_address: {
    type: String,
    default: ' Default delivery_address'
  },
  total_price: {
    type: Number,
  },
  buyer:{type: Schema.Types.ObjectId, 
    ref: "User" 
  },
  list_products: [{
    product: {type: Schema.Types.ObjectId, 
    ref: "Product" 
    },
    quantity: {
      type: Number,
      validate: {
        validator: function (quantity) {
          return quantity <= 0;
        },
        message: 'Price must be set at a higher figure than 0'
      }
    }
  }]
});

 
module.exports = mongoose.model('Order', OrderSchema);

/**
* Seeds the User collection with document (Order)
* and provided options.
*/
function seed(doc, options) {
  var Order = mongoose.model('Order');

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
        Order
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

            // Remove Order (overwrite)

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
            message: chalk.yellow('Database Seeding: Order\t' + doc.title + ' skipped')
          });
        }

        var Order = new Order(doc);

        Order.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Order\t' + Order.title + ' added'
          });
        });
      });
    }
  });
}
