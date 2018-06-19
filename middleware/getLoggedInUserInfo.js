
var mysql = require("mysql");
var express = require("express");
var jwt = require('jsonwebtoken');
var config = require('../config');
var connection = require("../database");

var getLoggedInUserInfo = function (req, res) {
    var decoded, userId;
    if (req.headers && req.headers.token) {
        try {
            decoded = jwt.verify(req.headers.token, config.secret);
            userId = decoded.user_id;
            var query = "SELECT * FROM user WHERE user_id=?";
            console.log("userId", userId);
            connection.query(query, [userId], function (err, rows) {
                if (err) {
                    res.json({ "Error": true, "Message": "Error executing MySQL query" });
                } else {
                    res.json({ "Error": false, "Message": "Success", "userinfo": rows[0] });
                }
            });
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
    }
};
module.exports = getLoggedInUserInfo;