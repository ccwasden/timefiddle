exports.index = function(req, res){
  res.sendfile('./public/views/construction.html');
};

exports.dashboard = require('./dashboard').index;
exports.email = require('./email');
exports.event = require('./event');
exports.login = require('./login').index;
exports.mobile = require('./mobile');
exports.user = require('./user');
exports.home = require('./home').index;
