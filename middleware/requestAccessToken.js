var Linkedin = require('node-linkedin')('81w7lxbgjbu0om', 'HrW2dJGz1zqyj9oq');
Linkedin.auth.setCallback('http://localhost:4200/oauth/linkedin/callback');

var requestAccessToken = function (req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function (err, results) {
        if (err)
            return console.error(err);

        /**
         * Results have something like:
         * {"expires_in":5184000,"access_token":". . . ."}
         */

        console.log(results);
        return res.redirect('/');
    });
};

module.exports = requestAccessToken;