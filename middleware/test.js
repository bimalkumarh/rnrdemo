var https = require('https'),
    concat = require('concat-stream'),
    async = require('async'),
    pdf = require('html-pdf'),
    fs = require('fs')
handlebars = require('handlebars');

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
var test = function (req, res) {

    /*var pageId = "1799911206694283";

    async.waterfall([

        function (done) {
            var params = {
                hostname: 'graph.facebook.com',
                port: 443,
                path: '/oauth/access_token?client_id=2067152256660153&' +
                    'client_secret=e8aa01d7f55b58d83b59c82a0935ea6a&grant_type=client_credentials',
                method: 'GET'
            };

            https.get(params, function (response) {
                //response is a stream so it is an EventEmitter
                response.setEncoding("utf8");

                //More compact
                response.pipe(concat(function (data) {
                    done(null, data);
                }));

                response.on("error", done);
            });
        },

        function (access_token, done) {
            console.log("access_token", JSON.parse(access_token).access_token);
            var params = {
                hostname: 'graph.facebook.com',
                port: 443,
                path: '/v2.0/' + pageId + '/feed?access_token=' + JSON.parse(access_token).access_token,
                method: 'GET'
            };

            console.log("params", params);

            https.get(params, function (response) {
                //response is a stream so it is an EventEmitter
                response.setEncoding("utf8");

                //More compact
                response.pipe(concat(function (data) {
                    //callback(null, JSON.parse(data));
                    res.json(JSON.parse(data));
                }));

                response.on("error", done);
            });

        }]);
    var buf = new Buffer('');
    fs.writeFile('public/downloads/test.pdf', buf);
    fs.readFile('public/downloads/test.pdf' , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });*/
    readHTMLFile(__dirname + '/test.html', function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            username: "HI USERRRRRRRRRRRRRRRRR"
        };
        var htmlToSend = template(replacements);


        var options = { format: 'Letter' };

        pdf.create(htmlToSend, options).toFile('./businesscard.pdf', function (err, res) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
            
        });


    });
    res.send('Created');
};
module.exports = test;

