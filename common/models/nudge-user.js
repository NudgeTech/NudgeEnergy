var app = require('../../server/server'); //require `server.js` as in any node.js app
 
module.exports = function(NudgeUser) {
	

	// method to return if the gift is free
    NudgeUser.makeAdmin = function(userId, cb) {
  
        var response;
        var Role = app.models.Role;
    	var RoleMapping = app.models.RoleMapping;
        NudgeUser.find({
            fields: {
                userId: userId
            }
        }, function(err, nudgeuser) {
            if (err) return cb(err);
            //create the admin role
			    Role.create({
			      name: 'admin'
			    }, function(err, role) {
			      if (err) throw err;

			      console.log('Created role:', role);

			      //make user an admin
			      role.principals.create({
			        principalType: RoleMapping.NudgeUser,
			        principalId: nudgeuser.userId
			      }, function(err, principal) {
			        if (err) throw err;

			        console.log('Created principal:', principal);
			         response = 'User made admin';
			      });
			    });

              

        });
        cb(null, response);
    };

    // expose the method through REST
    NudgeUser.remoteMethod('makeAdmin', {
        accepts: {
            arg: 'userId',
            type: 'string'
        },
        returns: {
            arg: 'response',
            type: 'string'
        },
        http: {
            path: '/makeAdmin',
            verb: 'post'
        }
    });

	

};
