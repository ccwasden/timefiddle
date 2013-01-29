/**
 *    Simple log for all server interactions. Very simple right now but can be extended in the future.
 *     Some ideas: save some information in the database to make it searchable, custom logs for different servers.
 *
 *
 */

var db = require("../database/database");
var ERROR = "ERROR";
var DEBUG = "DEBUG";
var INFO = "INFO";
var VERBOSE = "VERBOSE";

/**
 * Simple method that prints out the given method to the console and saves a copy of it to the database
 *
 * @param message The message to log
 * @param status One of the status codes defined in this file. Defaults to INFO
 */
function log(message, status) {
    var d = new Date();
    var date = d.toDateString() + " " + d.toLocaleTimeString() + " ";

    if(!status) {
        status = INFO;
    }

    if (typeof message === 'string') {
        console.log(date + message);
        var dbLog = {"date":date, "message":message};
        db.saveLog(dbLog);
    }
    else {
        console.log(date + "Invalid log message");
    }
}

/**
 * Simply prints out the given message to the console.
 * @param message
 * @param status
 */
function logWithoutDB(message, status) {
    var d = new Date();
    var date = d.toDateString() + " " + d.toLocaleTimeString() + " ";
    console.log(date + message);
}

exports.log = log;
exports.logWithoutDB = logWithoutDB;
exports.ERROR = ERROR;
exports.DEBUG = DEBUG;
exports.INFO = INFO;
exports.VERBOSE = VERBOSE;
