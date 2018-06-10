
var mysql = require("mysql");
var express = require("express");
var jwt = require('jsonwebtoken');
var config = require('../config');
var connection = require("../database");

var findAllUsers = function (req, res) {

    var query = "SELECT * FROM user";

    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            res.json({ "Error": false, "Message": "Success", "Users": rows });
        }
    });
};
module.exports = findAllUsers;