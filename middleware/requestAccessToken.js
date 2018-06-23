var request = require("request");

var client_id = "81w7lxbgjbu0om";
var client_secret = "HrW2dJGz1zqyj9oq";
var redirect_uri = "http://localhost:4200/oauth/linkedin/callback";

var requestAccessToken = function (req, res) {
    var options = {
        method: 'POST',
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
        headers:
            {
                'content-type': 'application/x-www-form-urlencoded'
            },
        form:
            {
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: redirect_uri,
                client_id: client_id,
                client_secret: client_secret
            }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log("access token result",body);
        console.log("token is",JSON.parse(body).access_token);
        if(JSON.parse(body).access_token) {
            res.cookie('linkedin_access_token' , JSON.parse(body).access_token);
            res.send('linkedin access token is set');
        }
    });

};
module.exports = requestAccessToken;