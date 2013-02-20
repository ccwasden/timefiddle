/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var email = require('./routes/email');
var event = require('./routes/event');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');
var mobile = require('./routes/mobile');
var http = require('http');
var path = require('path');
var lessMiddleware = require("less-middleware");


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

    //Using Jade templates for now
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');

    app.use(lessMiddleware({
        dest: __dirname + '/public/stylesheets',
        src: __dirname + '/src/less',
        prefix: '/stylesheets',
        compress: true
    }));

    //Some helper code for working with Strings
    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str){
            return this.slice(0, str.length) == str;
        };
    }
    app.use(express.static(__dirname + '/public'));

    
});

//Initialize the database
var db = require(__dirname + '/database/database');
db.init();

//Initialize the logger
var log = require(__dirname + '/log/log');
log.init('production');

//Development settings
app.configure('development', function () {
    app.get('*', function(req, res, next){

        //Log each request
        log.logRequest(req.url, req.ip);

        //Set up subdomains
        var host = req.headers.host;
        if(host.startsWith('m.localhost') || host.startsWith('mobile.localhost')) {
            req.url = '/mobile-app/TimeFiddle/build/TimeFiddle/production' + req.url;
        }
        next();
    });
    
});

//Production settings
app.configure('production', function () {
    app.get('*', function(req, res, next){

        //Log each request
        log.logRequest(req.url, req.ip);

        //Set up subdomains
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
app.get('/dashboard', dashboard.index);
app.get('/download', mobile.download);
app.post('/sendEmail', email.send);

http.createServer(app).listen(app.get('port'), function () {
    log.info("Express server listening on port " + app.get('port'));
});
