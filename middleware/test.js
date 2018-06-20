var Linkedin = require('node-linkedin')('81w7lxbgjbu0om', 'HrW2dJGz1zqyj9oq');
Linkedin.auth.setCallback('https://www.example.com/auth/linkedin');

var test = function (req, res) {    
    res.redirect('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81w7lxbgjbu0om&redirect_uri=http%3A%2F%2Flocalhost:4200%2Foauth%2Flinkedin%2Fcallback&state=987654321&scope=r_basicprofile');
};
module.exports = test;

