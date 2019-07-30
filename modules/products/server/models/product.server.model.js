'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  chalk = require('chalk'),
  Schema = mongoose.Schema;

var ProductSchema = new Schema({
  id_product: {
    type: String,
    required: 'Please fill in a product UIK',
    index: {
      unique: true,
      sparse: true
    }
  },
  product_name: {
    type: String,
    unique: 'Product name already exists',
    required: 'Please fill in a product name',
    trim: true,
    default: ''
  },
  image: {
    type: String,
    required: 'Please upload a product image',
    trim: true
  },
  version: {
    type: String,
    required: 'Please fill in a product version',
    trim: true
  },
  description: {
    type: String,
    required: 'Please fill in a product description'
  },
  stock: {
    type: Number,
    required: 'Please fill in a product stock',
    validate: {
      validator: function (stock) {
        return stock >= 0;
      },
      message: 'stock must be set at a higher figure than 0'
    }
  },
  price: {
    type: Number,
    required: 'Please fill in a product price',
    validate: {
      validator: function (price) {
        return price >= 0;
      },
      message: 'Price must be set at a higher figure than 0'
    }
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);


ProductSchema.statics.seed = seed;

/**
*this seed method is a static method to be incorporated the the model itself
* Seeds the Product collection with document (Product)
* and provided options.
*/
function seed(doc, options) {
  var Product = mongoose.model('Product');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Product
          .findOne({
            product_name: doc.product_name
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

            // Remove Product (overwrite)

            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }
	//adds product only if not existant
    function add(skip) {
      return new Promise(function (resolve, reject) {

        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Product\t\t' + doc.product_name+ ' skipped')
          });
        }
		
         //creates a product with the provided doc
		var product = new Product(doc);
          
          product.save(function (err) {
            if (err) {
              return reject(err);
            }

            return resolve({
              message: 'Database Seeding: Product\t\t' + product.product_name + ' added ' 
            });
          });
    })
          .catch(function (err) {
            return reject(err);
          });
      };
    });
  };

