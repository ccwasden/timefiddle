/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var email = require('./routes/email');
var event = require('./routes/event');
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

    //Set up subdomains
    app.use(express.vhost('m.timefiddle.com', require('./public/mobile-app/TimeFiddle/build/TimeFiddle/production').app))
        .use(express.vhost('mobile.timefiddle.com', require('./public/mobile-app/TimeFiddle/build/TimeFiddle/production').app))
        .listen(80)});

//Change to production upon launch
app.configure('development', function () {
    app.locals.log = require('./log/log.js').init('development');
});

//Define routes for the app. Basically creating a mapping between URLs and functions
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/createEvent', event.create);

app.post('/sendEmail', email.send);


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
