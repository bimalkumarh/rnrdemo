var express = require("express");
var http = require('http');
var mysql = require("mysql");
var bodyParser = require("body-parser");
var config = require('./config');
var cookieParser = require('cookie-parser');

var verifyToken = require('./middleware/verifyToken');
var addNewUser = require('./middleware/addNewUser');
var userLoginCheck = require('./middleware/userLoginCheck');
//var findAllUsers = require('./middleware/findAllUsers');
var welcome = require('./middleware/welcome');
var getLoggedInUserInfo = require('./middleware/getLoggedInUserInfo');
var savePassword = require('./middleware/savePassword');
var test = require('./middleware/test');
var requestAccessToken = require('./middleware/requestAccessToken');
var readFeeds = require('./middleware/readFeeds');
var forgotPassword = require('./middleware/changePassword');
var forgotPasswordEmail = require('./middleware/forgotPasswordEmail');
var documentUpload = require('./middleware/documentUpload');
var documentDelete = require('./middleware/documentDelete');
var documentView = require('./middleware/documentView');

var port = process.env.PORT || 4200;

//var twilio = require('twilio');
var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

app.post('/signup', addNewUser);
app.post('/userlogin', userLoginCheck);
app.post('/forgotpw', forgotPassword);
app.get("/linkedin/auth", test);
app.get('/oauth/linkedin', test);
app.get('/oauth/linkedin/callback', requestAccessToken);
app.get('/linkedin/feeds', readFeeds);
app.post('/forgotpw/sendemail', forgotPasswordEmail);

app.all('/test', test);

var apiRoutes = express.Router();
apiRoutes.use(bodyParser.urlencoded({ extended: true }));
apiRoutes.use(bodyParser.json());
//route middleware to verify a token 
apiRoutes.use(verifyToken);
apiRoutes.get('/', welcome);
//apiRoutes.get('/users', findAllUsers);
apiRoutes.get('/userinfo', getLoggedInUserInfo);
apiRoutes.post('/savePassword', savePassword);
apiRoutes.post('/document/upload', documentUpload);
apiRoutes.get('/document/delete/:documentId',documentDelete);
apiRoutes.get('/document/view/:documentId',documentView);
app.use('/api', apiRoutes);