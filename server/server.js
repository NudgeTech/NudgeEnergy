var loopback = require('loopback');
var boot = require('loopback-boot');
var morgan = require('morgan');
var clientIDcheck = require('./middleware/clientIDcheck');

var app = module.exports = loopback();

app.middleware('routes:before', morgan('dev'));
app.middleware('initial:before', clientIDcheck());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;


  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
