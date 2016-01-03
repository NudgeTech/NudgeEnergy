var CronJob = require('cron').CronJob;

module.exports = function(app) {
  new CronJob('* * * * * *', function() {

  	//this is where the logic goes when getching the data from an 
  	//external api.  

  	/*
		see the doc on 
		https://docs.strongloop.com/display/public/LB/REST+connector\
		to setup a connector to call an external rest api
  	*/

    console.log('fetching nudges every second');
  }, null, true);
};