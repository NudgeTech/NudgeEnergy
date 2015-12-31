module.exports = function(app) {
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

   User.findOne({
    email: 'admin@admin.com'
  }, function(err, user) {

      if(!user){
          
          console.log ("user does not exisit");
          var newUser = new User();

          newUser.username = 'admin';
          newUser.password = 'password';
          newUser.email = 'admin@admin.com';
          newUser.id = '101';
      
          newUser.save(function(err) {
      
              if(!err) {
                //res.status(status).send(body)
               console.log("User created with name: " + newUser.username);
      
              } else {
                  console.log("failed");
              }
          });


           //create the admin role
          Role.create({
             name: 'admin'
                }, function(err, role) {
                  if (err) throw err;

                  console.log('Created role:', role);

                  //make user an admin
                  role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: newUser.id
                  }, function(err, principal) {
                    if (err) throw err;

                    console.log('Created principal:', principal);
                  });
              });  



      }else if (user){

           console.log ("user does exisit and is already an admin");
           console.log (user.id);
        

      }


  });
          
       
            
        

  



   

}