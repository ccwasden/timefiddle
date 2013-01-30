
/*
 * Sends an email to the address supplied.
 */
var validator = require("validator");
var check = validator.check;
var sanitize = validator.sanitize;
var nodemailer = require("nodemailer");
var jade = require("jade");
var fs = require("fs");

exports.send = function(req, res) {
    //Validate the user input
    var userEmail = req.body.email;
    var name = req.body.name;
    var eventDate = req.body.eventDate;
    try {
        //If any of these fail, then an exception is thrown
        check(userEmail).isEmail();
        check(eventDate).isDate();
        name = sanitize(name).xss();

        console.log("Sending an email to " + userEmail);
        res.render('emailSuccess', { title: "Success!", email: userEmail });

        // create reusable transport method (opens pool of SMTP connections)
        var smtpTransport = nodemailer.createTransport("SMTP",{
            service: "Gmail",
            auth: {
                //Insert your gmail info here
            }
        });

        //Render the HTML
        fs.readFile('./views/eventCreated.jade', 'utf8', function (err, fileData) {
            if (err) throw err;
            var render = jade.compile(fileData);
            var renderedEmail = render({name:name, eventDate: eventDate, style:emailStyle});

            var mailOptions = {
                from: "%INSERT SENDER HERE%", // sender address
                to: userEmail, // list of receivers
                subject: "Event Created!", // Subject line
                text: "Hello world", // plaintext body
                html: renderedEmail // html body
            };

            // send mail with defined transport object
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                }else{
                    console.log("Message sent: " + response.message);
                }

                // if you don't want to use this transport object anymore, uncomment following line
                smtpTransport.close(); // shut down the connection pool, no more messages
            });

        });

    } catch (e) {
        res.json(200, {'error': {type: "Validation Error", message: e.message}});
    }
};

var emailStyle = {
    "h1":"font: 28px LucidaGrande, Helvetica, Arial, sans-serif;",
    "p":"font: 14px LucidaGrande, Helvetica, Arial, sans-serif;"
};