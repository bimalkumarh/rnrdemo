
var mysql = require("mysql");
var express = require("express");
var jwt = require('jsonwebtoken');
var config = require('../config');
var connection = require("../database");
var sha1 = require("sha1");

var savePassword = function (req, res) {
    var userId = req.body.user_id
    var password = req.body.password;
    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*-_])(?=.{8,})");
    var query = "SELECT * FROM user WHERE user_id=?";
    connection.query(query, [userId], function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            if (rows.length == 1) {
                if (regex.test(password)) {
                    var query = "update user set password=? WHERE user_id=?";
                    connection.query(query, [sha1(password), userId], function (err, rows) {
                        if (err) {
                            res.json({ "Error": true, "Message": "Error executing MySQL query" });
                        } else {
                            res.json({ "Error": true, "Message": "Password changed successfully." });
                        }
                    });
                } else {
                    res.json({ "Error": true, "Message": "Password should have minimum 8 characters, one number and should have one special character among $@$!%#*?&^-_" });
                }
            } else {
                res.json({ "Error": true, "Message": "User details not found." });
            }
        }
    });
};
module.exports = savePassword;