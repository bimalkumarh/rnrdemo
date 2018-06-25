var APIKey = "81w7lxbgjbu0om";
var APIKeySecret = "HrW2dJGz1zqyj9oq";

var readFeed = function (req, res) {
    console.log("Cookies :  ", req.cookies.linkedin_access_token);
    if (req.cookies.linkedin_access_token) {
        var request = require("request");

        var options = {
            method: 'GET',
            url: 'https://api.linkedin.com/v1/companies/1337/updates',
            qs: { format: 'json' },
            headers: { authorization: 'Bearer ' + req.cookies.linkedin_access_token }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);

            res.json(JSON.parse(body));
        });

    } else {
        res.status(401).send("Authentication needed");
    }
};


module.exports = readFeed;

