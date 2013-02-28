/**
 * Entry point for our server. Handles all requests to timefiddle.com m.timefiddle.com and api.timefiddle.com.
 */

//External Node.JS modules
var express = require('express');
var http = require('http');
var path = require('path');
var lessMiddleware = require("less-middleware");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var MongoStore = require('connect-mongo')(express);

//Our custom modules
var logger = require(__dirname + '/src/log/log');
var db = require(__dirname + '/src/database/database');
var routes = require(__dirname + '/routes');
var authentication = require(__dirname + '/src/authentication/authentication');

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
    app.use(express.cookieParser());
    app.use(express.session({
        secret: "chucks fun time emporium",
        store: new MongoStore({db: "timefiddle"}),
        cookie: { maxAge: 600000 }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
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
        //,compress:true
    }));

    //Initialize the database for the app
    db.init();

    //Configure Authentication settings
    passport.use(new LocalStrategy(authentication.authStrategy));
    passport.serializeUser(function(user, done) {
        done(null,user.id);
    });
    passport.deserializeUser(function(id, done) {
        //TODO reload the user from the DB by the id
        done(null,id);
    });

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
app.get('/home', routes.home.index);
app.get('/download', routes.download.index);
app.get('/create', routes.event.index);
app.get('/create', routes.event.index);
app.get('/login', routes.login.index);

//Routes that require authentication
app.get('/dashboard', ensureAuthenticated, routes.dashboard.index);

//API POST requests
app.all('/api/user/logout', routes.user.logout);
app.post('/api/user/login', routes.user.login);
app.post('/api/user/create', routes.user.create);
app.post('/api/event/create', routes.event.create);

//TODO refactor
app.post('/sendEmail', routes.email.send);

http.createServer(app).listen(app.get('port'), function () {
    logger.info("Express server listening on port " + app.get('port'));
});

/**
 * Simple route middleware to ensure user is authenticated.
 * Use this route middleware on any resource that needs to be protected.
 * If the request is authenticated (typically via a persistent login session),
 * the request will proceed.  Otherwise, the user will be redirected to the login page.
 */
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}
