var https = require('https');
var url = require('url');

var APIKey = "81w7lxbgjbu0om";
var APIKeySecret = "HrW2dJGz1zqyj9oq";
var callbackURL = "http://localhost:4200/oauth/linkedin/callback";
var APIVersion = "v1";

// These are all of the scope variables. Remove them based on your needs
// w_share r_emailaddress r_basicprofile 
var APIScope = 'rw_company_admin';

var test = function (req, res) {
    res.redirect('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' + APIKey + '&scope=' + APIScope + '&state=RNDM_' + RandomState(18) + '&redirect_uri=' + callbackURL);
    
};

var RandomState = function (howLong) {

    howLong = parseInt(howLong);

    if (!howLong || howLong <= 0) {
        howLong = 18;
    }
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

    for (var i = 0; i < howLong; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


module.exports = test;

