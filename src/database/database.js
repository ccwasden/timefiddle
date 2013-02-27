/**
 *    Used to abstract away all database functionality and provide a clean API for all database functions
 *    Some data sanitization should be performed before data is actually saved.
 *
 */

var log = require("../log/log.js");
var initialized;
var db;

/**
 *    Database initialization function. MUST be called once before any other DB functions are called.
 */
exports.init = function() {
    if(!initialized) {
        var mongoDriver = require("mongojs");

        // All collections used by the file need to be referenced here first.
        var collections = ["event", "log", "userinformation", "user", "session"];

        // Specify IP, Port, and db to connect to here
        var connectionInfo = "127.0.0.1:27017/timefiddle";
        db = mongoDriver.connect(connectionInfo, collections);
        db.log.findOne({status : "INFO"}, function (err, results) {
            if(err) {
                throw "Database initialization failed!";
            }
            else {
                initialized = true;
            }
        });
    }
};

/**
 *   Save log information into the log collection in the DB.
 *   Used instead of a log file for ease of access
 *   NOTE: no callback given since log saving should be rather trivial
 *   @param log The log object to save
 */
exports.saveLog = function(log) {
    db.log.save(log);
}

/**
 *  Searches the log collection for objects with the given status
 *  @param status The type of status to search for
 *  @param limit The number of results to limit the search to
 */
exports.findLogByStatusType = function(status, limit) {
    //TODO complete this function
};

/**
 *    Returns whether or not the user is authorized.
 *    Calls the callback function if they are authorized, passing in a valid user object.
 */
exports.authenticateUser = function(username, password, callback) {
    //TODO salt and hash passwords!
    var query = {"username":username, "password":password };
    db.user.findOne(query, {username: 1, password: 1, id: 1, _id : -1}, function (err, results) {
        if(err) {
            callback(err);
        }
        else if (results) {
            var user = {"username": results.username, "id" : results.id, "validPassword": true};
            callback(null, user);
        }
        else {
            callback(null, false);
        }
    });
};

exports.serializeUser = function(user, done) {
    console.log("Serializing user");
};

exports.deserializeUser = function(id, done) {
    console.log("DEserializing user");
}

/**
 *    Stores basic information about a user including the UUID used in sending push requests to the phone
 *    Called when a user first launches the app on their phone.
 */
exports.registerUser = function(info, callback) {
    //TODO verify registration information?
    var d = new Date();
    var date = d.toDateString() + " " + d.toLocaleTimeString() + " ";
    var data = {
        "deviceName":info.deviceName,
        "deviceID":info.deviceID,
        "OS":info.OS,
        "OSVersion":info.OSVersion,
        "userID":info.userID,
        "created":date
    };
    db.userinformation.save(data, function (err, saved) {
        if (err || !saved) {
            log.log("Error occured while saving userinformation " + JSON.stringify(err));
            callback(false);
        }
        else {
            callback(true);
        }
    });
};