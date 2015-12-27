module.exports = function() {
  return function(req, res, next) {
  	//check that certain requests have client ID in it for
    console.log(' Client id exisits in api call middleware triggered.');

    next();
  };
};