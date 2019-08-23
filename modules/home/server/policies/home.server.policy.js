'use strict';

/**
 * Module dependencies
 */
var acl = require('acl'),
mongoose = require('mongoose'),
homeModel = mongoose.model('Home');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Articles Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([{
    roles: ['admin'],
    allows: [{
        resources: '/api/homes/',
        permissions: '*'
    }, {
        resources: '/api/homes/:homeId',
        permissions: '*'
    }
    , {
        resources: '/api/homes/:homeId/owners',
        permissions: '*'
    }
    , {
        resources: '/api/homes/:homeId/devices',
        permissions: '*'
    }
]
    }
    , {
        roles: ['client'],
        allows: [{
            resources: '/api/homes/',
            permissions: ['post']
        }, {
            resources: '/api/homes/:homeId',
            permissions: ['*']
        }]
    }]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    console.log("%j" ,req.user );
   // console.log("home_id user" + req.user.home_id);
    var roles = (req.user) ? req.user.roles : ['guest'];
    console.log("%j" ,req.params.homeId );
  // If a home  is being processed and the current user created it then allow any manipulation    
    if (req.home && req.user && req.home.owners.user && req.home.owners.user.id === req.user.id) {
            return next();
    }
  // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
        return res.status(500).send('Unexpected authorization error');
    } else {
        if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
    } else {
        return res.status(403).json({
            message: 'User is not authorized'
        });
    }
    }
});
};