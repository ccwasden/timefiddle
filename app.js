/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var email = require('./routes/email');
var event = require('./routes/event');
var login = require('./routes/login');
var mobile = require('./routes/mobile');
var http = require('http');
var path = require('path');

var app = express();

app.configure(function () {
    app.set('title', 'TimeFiddle');
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);

    //Path to static files
    app.use(express.static(path.join(__dirname, 'public')));

    //Using Jade templates for the time being
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');

    //Some helper code for working with Strings
    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str){
            return this.slice(0, str.length) == str;
        };
    }
});

//Development settings
app.configure('development', function () {
    app.locals.log = require('./log/log.js').init('development');
    //Set up subdomains
    app.get('*', function(req, res, next){
        var host = req.headers.host;
        if(host.startsWith('m.localhost') || host.startsWith('mobile.localhost')) {
            req.url = '/mobile-app/TimeFiddle/build/TimeFiddle/production' + req.url;
        }
        next();
    });
});

//Production settings
app.configure('production', function () {
    //Set up subdomains
    app.get('*', function(req, res, next){
        var host = req.headers.host;
        if(host.startsWith('m.timefiddle') || host.startsWith('mobile.timefiddle')) {
            req.url = '/mobile-app/TimeFiddle/build/TimeFiddle/production' + req.url;
        }
        next();
    });
});

//Define routes for the app. Basically creating a mapping between URLs and functions
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/create', event.create);
app.get('/login', login.index);
app.get('/download', mobile.download);

app.post('/sendEmail', email.send);


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
