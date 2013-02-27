/**
 * This defines the authentication strategies for the app. Also handles storage and retrieval of user credentials.
 */
var db = require("../database/database");

exports.authStrategy = function(username, password, done) {
    db.authenticateUser(username, password, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
};
