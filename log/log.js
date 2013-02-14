/**
 *    Simple log for all server interactions.
 *    A copy of all log messages are saved into the database for easier accessibility and searching.
 *    The different levels of logging serve to simplify the search and provide a easy level of abstraction.
 */

var db = require('../database/database');
var saveToDatabase = false;

/**
 * Simple method that prints out the given method to the console and saves a copy of it to the database
 *
 * @param message The message to log
 */
function log(message, status, obj) {
    var dbLog = {};
    if(obj) {
        dbLog = obj;
    }
    var d = new Date();
    var date = d.toDateString() + " " + d.toLocaleTimeString() + " ";

    if (typeof message === 'string') {
        console.log(status + " " + date + message);
        if(saveToDatabase) {
            dbLog.status = status;
            dbLog.date = date;
            dbLog.message = message;
            db.saveLog(dbLog);
        }
    }
    else {
        console.log(date + "Invalid log message");
    }
}

/**
 * Simple initialization function used to set up the logger.
 * @param app
 */
exports.init = function(app) {
    if(app === 'development') {
        saveToDatabase = false;
    } else if(app === 'production') {
        saveToDatabase = true;
    }
    exports.info("Logger initialized for " + app);
    //Any other initialization can happen here
};

/**
 * Log messages at the DEBUG level
 * @param message
 */
exports.debug = function(message) {
    log(message, "DEBUG");
};

/**
 * Log messages at the INFO level
 * @param message
 */
exports.info = function(message) {
    log(message, "INFO");
};

/**
 * Log messages at the WARNING level
 * @param message
 */
exports.warn = function(message) {
    log(message, "WARNING");
};

/**
 * Log messages at the ERROR level
 * @param message
 */
exports.error = function(message) {
    log(message, "ERROR");
};

/**
 * Logs the request from the given ip for the given url.
 * @param url
 * @param ip
 */
exports.logRequest = function(url, ip) {
    log(url, "REQUEST", {"ip": ip});
};
