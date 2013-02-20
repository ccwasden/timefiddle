/**
 * Entry point for our server. Handles all requests to timefiddle.com m.timefiddle.com and api.timefiddle.com.
 */

//External Node.JS modules
var express = require('express');
var http = require('http');
var path = require('path');
var lessMiddleware = require("less-middleware");

//Our custom modules
var log = require(__dirname + '/log/log');
var db = require(__dirname + '/database/database');

//Our custom modules that need no further references
require(__dirname + '/src/string/string');

//Our custom routes
var routes = require('./routes');

var app = express();

app.configure(function () {

    //Config options
    app.set('title', 'TimeFiddle');
    app.set('port', process.env.PORT || 3000);
    app.use(express.compress());
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);

    //Using Jade templates for now
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');

    //Use LESS CSS goodness
    app.use(lessMiddleware({
        dest: __dirname + '/public/stylesheets',
        src: __dirname + '/src/less',
        prefix: '/stylesheets',
        compress: true
    }));

    //Initialize the database for the app
    db.init();

    //Path to static files
    app.use(express.static(path.join(__dirname, 'public')));
});

//Development settings
app.configure('development', function () {
    //Set up subdomains
    app.all('*', function(req, res, next){
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
    app.all('*', function(req, res, next){
        var host = req.headers.host;
        if(host.endsWith('.net') || host.endsWith('.org') || host.endsWith('.info')) {
            req.redirect(301, 'http://www.timefiddle.com');
        }
        else if(host.startsWith('m.timefiddle') || host.startsWith('mobile.timefiddle')) {
            req.url = '/mobile-app/TimeFiddle/build/TimeFiddle/production' + req.url;
        }
        next();
    });
});

//Log every single request
app.all('*', function(req, res, next) {
    log.logRequest(req.url, req.ip);
    next();
});

//Define routes for the app. Basically creating a mapping between URLs and functions
app.get('/', routes.index);
app.get('/users', routes.user.list);
app.get('/create', routes.event.create);
app.get('/login', routes.login);
app.get('/dashboard', routes.dashboard);
app.get('/download', routes.mobile.download);
app.post('/sendEmail', routes.email.send);

http.createServer(app).listen(app.get('port'), function () {
    log.info("Express server listening on port " + app.get('port'));
});
