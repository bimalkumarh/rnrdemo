
var mysql = require("mysql");
var express = require("express");
var sha1 = require("sha1");
var connection = require("../database");
var jwt = require('jsonwebtoken');
var config = require('../config');

var addNewUser = function (req, res, next) {
	var date = new Date();
	var post = [req.body.first_name, req.body.last_name, req.body.email, ""];
	console.log(post);
	var query = "SELECT email FROM user WHERE email=?";

	connection.query(query, [req.body.email], function (err, rows) {
		if (err) {
			res.json({ "Error": true, "Message": "Error executing MySQL query" });
		}
		else {

			if (rows.length == 0) {

				var query = "INSERT INTO user(first_name,last_name,email,password) VALUES (?,?,?,?)";
				connection.query(query, post, function (err, rows) {
					if (err) {
						res.json({ "Error": true, "Message": "Error executing MySQL query" });
					} else {
						var token = jwt.sign({ "user_id": rows.insertId, "email": req.body.email }, config.secret, {
							expiresIn: 1440
						});
						res.json({ "Error": false, "Message": "Success", token: token, currUser: rows.insertId });
					}
				});

			}
			else {
				res.json({ "Error": false, "Message": "Email Id already registered" });
			}
		}
	});
}

module.exports = addNewUser;


