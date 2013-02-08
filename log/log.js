/**
 *    Simple log for all server interactions.
 *    A copy of all log messages are saved into the database for easier accessibility and searching.
 *    The different levels of logging serve to simplify the search and provide a easy level of abstraction.
 */

var db = require("../database/database");
var saveToDatabase = false;

/**
 * Simple method that prints out the given method to the console and saves a copy of it to the database
 *
 * @param message The message to log
 */
function log(message) {
    var d = new Date();
    var date = d.toDateString() + " " + d.toLocaleTimeString() + " ";

    if (typeof message === 'string') {
        console.log(date + message);
        if(saveToDatabase) {
            var dbLog = {"date":date, "message":message};
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
    if(app.dev) {
        saveToDatabase = false;
    } else if(app.prod) {
        saveToDatabase = true;
    }
    //Any other initialization can happen here
};

/**
 * Log messages at the DEBUG level
 * @param message
 */
exports.debug = function(message) {
    log("DEBUG " + message);
};

/**
 * Log messages at the INFO level
 * @param message
 */
exports.info = function(message) {
    log("INFO " + message);
};

/**
 * Log messages at the WARNING level
 * @param message
 */
exports.warn = function(message) {
    log("WARNING " + message);
};

/**
 * Log messages at the ERROR level
 * @param message
 */
exports.error = function(message) {
    log("ERROR " + message);
};