exports.index = function(req, res){
  res.sendfile('./public/views/construction.html');
};

exports.home = require('./home');
exports.event = require('./event');
exports.download = require('./download');
exports.login = require('./login');

exports.dashboard = require('./dashboard');
exports.user = require('./user');

exports.email = require('./email');
