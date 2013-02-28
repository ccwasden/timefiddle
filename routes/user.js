/**
 * Routes for all requests relating to users, including registering, logging in/out, etc.
 */

exports.logout = function(req, res){
    req.logout();
    res.redirect('/home'); //TODO change this to just / instead of /home when we launch
};

exports.login = require("passport").authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login' });

exports.create = function(req, res) {
    res.json({"TODO": "implement"});
    res.end();
    //TODO implement
};

