/**
 *    Simple log for all server interactions.
 *    A copy of all log messages are saved into the database for easier accessibility and searching.
 *    The different levels of logging serve to simplify the search and provide a easy level of abstraction.
 */

var db = require('../database/database');

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
        dbLog.status = status;
        dbLog.date = d;
        dbLog.message = message;
        db.saveLog(dbLog);
    }
    else {
        console.log(date + "Invalid log message");
    }
}

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
 * Middleware function for express. Logs every request made to the server into the database.
 */
exports.logRequest = function() {
    return function(req, res, next) {
        log(req.url, "REQUEST", {"ip": req.ip});
        next();
    }
};

