var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
var connection = require("../database");

var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

var forgotPasswordEmail = function (req, res) {

    var email = req.body.email;

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'x7k6odpowzief7ao@ethereal.email', // generated ethereal user
            pass: 'w7CUcz2aAXGgm9begP' // generated ethereal password
        }
    });

    var query = "SELECT * FROM user WHERE email=?";
    connection.query(query, [email], function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            if (rows.length == 1) {
                //need to add this field in the database
                var query = "update user set forgotpw_reqtime=? WHERE user_id=?";
                var requestedTime = new Date().toString();
                connection.query(query, [requestedTime, rows[0].user_id], function (err, result) {
                    if (err) {
                        console.log("Error executing MySQL query");
                    } else {
                        console.log("forgot password request timestamp updated");
                    }
                });

                readHTMLFile(__dirname + '/emailforgotpw.html', function (err, html) {
                    var template = handlebars.compile(html);
                    var replacements = {
                        url: "www.example.com/somepage?userid=" + rows[0].user_id
                    };
                    var htmlToSend = template(replacements);
                    console.log("htmlToSend", htmlToSend);
                    var mailOptions = {
                        from: "bimalk.inapp@gmail.com",
                        to: email,
                        subject: 'Forgot Password',
                        html: htmlToSend
                    };
                    transporter.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            console.log(error);
                            callback(error);
                        }
                        console.log('response', response);
                        res.send("mail sent");
                    });
                });
            } else {
                res.json({ "Error": true, "Message": "Email not found" });
            }
        }
    });






};

module.exports = forgotPasswordEmail;