/**
 * Entry point for our server. Handles all requests to timefiddle.com m.timefiddle.com and api.timefiddle.com.
 */

//External Node.JS modules
var express = require('express');
var http = require('http');
var path = require('path');
var lessMiddleware = require("less-middleware");

//Our custom modules
var logger = require(__dirname + '/src/log/log');
var db = require(__dirname + '/src/database/database');
var routes = require(__dirname + '/routes');

//Our custom modules that need no further references
require(__dirname + '/src/string/string');

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
    app.use(logger.logRequest());

    //Using Jade templates for now
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');

    //Use LESS CSS goodness
    app.use(lessMiddleware({
        dest: __dirname + '/public/stylesheets',
        src: __dirname + '/src/less',
        prefix: '/stylesheets'
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
            res.redirect(301, 'http://www.timefiddle.com');
            //No next() after redirect
        }
        else if(host.startsWith('m.timefiddle') || host.startsWith('mobile.timefiddle')) {
            req.url = '/mobile-app/TimeFiddle/build/TimeFiddle/production' + req.url;
            next();
        } else {
            next();
        }
    });
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
    logger.info("Express server listening on port " + app.get('port'));
});
