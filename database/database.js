/**
 *    Used to abstract away all database functionality and provide a clean API for all database functions
 *    Some data sanitization should be performed before data is actually saved.
 *
 */

var log = require("../log/log.js");
var initialized = false;
var mongo;

/**
 *    Database initialization function. MUST be called once before any other DB functions are called.
 */
function init() {
    if(!initialized) {
        var mongoDriver = require("mongojs");

        // All collections used by the file need to be referenced here first.
        var collections = ["event", "log", "userinformation"];

        // Specify IP, Port, and db to connect to here
        var connectionInfo = "127.0.0.1:27017/timeFiddle";
        mongo = mongoDriver.connect(connectionInfo, collections);
        initialized = true;
    }
}

/**
 *   Save log information into the log collection in the DB.
 *   Used instead of a log file for ease of access
 */
function saveLog(log) {
    mongo.log.save(log);
}

/**
 *    Saves the authorization token for the current user. access_token is analogous to a session_id
 *     TODO this should probably have a callback
 */
function saveUserAuthorization(userID, access_token) {
    mongo.userauthorization.save({'userID':userID, 'access_token':access_token}, function (err, saved) {
        if (err || !saved) {
            log.log("Error occured while saving userauthorization " + JSON.stringify(err));
        }
    });
}

/**
 *    Returns whether or not the user (specified by userID) is still authorized.
 *    Does so by calling the function specified by callback and passing it a value of
 *    true is they are authorized and false if they are not
 */
function isUserAuthorized(userID, access_token, callback) {
    mongo.userauthorization.find({'userID':userID, 'access_token':access_token}, function (err, results) {
        var found = false;
        console.log("results from db " + JSON.stringify(results));
        //TODO: add timeout check!
        if (results && results.length == 1) {
            callback(true, results[0].userID);
        }
        else {
            callback(false);
        }
    });
}

/**
 *    Stores basic information about a user including the UUID used in sending push requests to the phone
 *    Called when a user first launches the app on their phone.
 */
function registerUser(info, callback) {
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
    mongo.userinformation.save(data, function (err, saved) {
        if (err || !saved) {
            log.log("Error occured while saving userinformation " + JSON.stringify(err));
            callback(false);
        }
        else {
            callback(true);
        }
    });
}

exports.init = init;
exports.saveLog = saveLog;
exports.isUserAuthorized = isUserAuthorized;
exports.saveUserAuthorization = saveUserAuthorization;
exports.registerUser = registerUser;