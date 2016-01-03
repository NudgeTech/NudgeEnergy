module.exports = function(Nudge) {

	Nudge.observe('before save', function (ctx, next) {
		  if (ctx.instance) {
		    ctx.instance.date_created = new Date();
		  } else {
		    ctx.data.date_created = new Date();
		  }
		  next();
	});

	Nudge.complete = function(nudgeID, cb){
		var response;
		var nudgeID = nudgeID;

		//find the nudge to update
		Nudge.findById(nudgeID, function(err, nudge) {
	  			if(!nudge){
	  				console.log(nudgeID);
	  				console.log ("This Nudge has been removed or does not exisit");
	  			}else{
	  				nudge.updateAttributes({
	  					id: nudge.id,
	  					complete: true
	  				}, function(err) {
		  					console.log("error check");
		  					if(err){
		  						console.log("error occured");
		  					}else{

		  						console.log("no error");	  						
		  					}

	  				});

  			}

  		});
		
		cb(null, response);
	};

	//expose the method through REST
    Nudge.remoteMethod('complete', {
        accepts: {
            arg: 'nudgeID',
            type: 'string'
        },
        returns: {
            arg: 'response',
            type: 'string'
        },
        http: {
            path: '/complete',
            verb: 'post'
        }
    });

};
