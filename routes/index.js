exports.index = function(req, res){
  res.sendfile('./public/views/index.html');
};

exports.dashboard = require('./dashboard').index;
exports.email = require('./email');
exports.event = require('./event');
exports.login = require('./login').index;
exports.mobile = require('./mobile');
exports.user = require('./user');
