
var mysql = require("mysql");
var express = require("express");
var jwt = require('jsonwebtoken');
var config = require('../config');
var connection = require("../database");

var getLoggedInUserInfo = function (req, res) {
    		var decoded, userId;
        try {
            decoded = jwt.verify(req.headers.token, config.secret);
            userId = decoded.user_id;
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
};
module.exports = getLoggedInUserInfo;