'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  UserModel = require('./user.server.model'),
  path = require('path'),
  Schema = mongoose.Schema


var BlogSchema = new Schema({
  id_post: {
    type: String,
    index: {
      unique: true,
      sparse: true
    },
    lowercase: true,
    trim: true,
    required: 'Fill in a post ID'
  },
  title: {
    type: String,
    maxlength: 50,
    required: 'Fill in a post title'
  },
  brief: {
    type: String,
    required: 'Fill in a post brief description'
  },
  description: {
    type: String,
    required: 'Fill in a post long description'
  },
  image: [{ type: String }],
  shares: {
    type: Number
  },
  likes:  {type: Schema.Types.ObjectId, ref: "User"} ,
  comments: [ {type: Schema.Types.ObjectId, ref: "User"}, { type: String ,}, { type: Date, default : Date.now}],
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  author:  {type: Schema.Types.ObjectId, ref: "User" ,
    required: 'Fill in a post author'
  }
});

BlogSchema.statics.seed = seed;
module.exports = mongoose.model('Blog', BlogSchema);


//must complete the seeds for the blog

function seed(doc, options) {
  var Blog = mongoose.model('Blog');

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
        Article
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

            // Remove Blog (overwrite)

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
            message: chalk.yellow('Database Seeding: Blog \t' + doc.title + ' skipped')
          });
        }

        var blog = new Blog(doc);

        blog.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Blog\t' + blog.title + ' added'
          });
        });
      });
    }
  });
}
