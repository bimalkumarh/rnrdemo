var https = require('https'),
    concat = require('concat-stream'),
    async = require('async');


var test = function (req, res) {

    var pageId = "1799911206694283";

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

};
module.exports = test;

