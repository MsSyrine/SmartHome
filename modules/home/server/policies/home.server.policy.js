'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Articles Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([{
    roles: ['client'],
    allows: [{
        resources: '/api/homes/',
        permissions: '*'
    }, {
        resources: '/api/homes/:home_id',
        permissions: '*'
    }
    , {
        resources: '/api/homes/:home_id/owners',
        permissions: '*'
    }
    , {
        resources: '/api/homes/:home_id/devices',
        permissions: '*'
    }
]
    }
    , {
        roles: ['guest'],
        allows: [{
            resources: '/api/homes/',
            permissions: ['get']
        }, {
            resources: '/api/homes/:home_id',
            permissions: ['get']
        }]
    }]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];
  // If an article is being processed and the current user created it then allow any manipulation
    console.log("%j" ,req.home );
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