module.exports = function(app) {
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;


    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;

      console.log('Created role:', role);

      //make user an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: '56816186d08e9604d37869c2'
      }, function(err, principal) {
        if (err) throw err;

        console.log('Created principal:', principal);
      });
    });

}