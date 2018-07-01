
var mysql = require("mysql");
var express = require("express");
var sha1 = require("sha1");
var jwt = require('jsonwebtoken');
var config = require('../config');
var connection = require("../database");

var userLoginCheck = function (req, res) {

	var query = "SELECT * FROM user WHERE email=? AND password=?";
	console.log("sha",sha1(req.body.password));
	connection.query(query, [req.body.email, sha1(req.body.password)], function (err, rows) {
		if (err) {
			res.json({ "Error": true, "Message": "Error executing MySQL query" });
		}
		else {
			console.log("rows", rows);
			if (rows.length == 1) {
				var test = rows;
				var token = jwt.sign({"user_id":rows[0].user_id,"email":rows[0].email}, config.secret, {
					expiresIn: '1d'
				});
				user_id = rows[0].userid;
				var data = [rows[0].user_id, token]
				var query = "INSERT INTO access_token(user_id,access_token) VALUES (?,?)";

				connection.query(query, data, function (err, rows) {
					if (err) {
						res.json({ "Error": true, "Message": "Error executing MySQL query" });
					} else {
						res.json({
							success: true,
							message: 'Token generated',
							token: token,
							currUser: user_id
						});
					}
				});
			}
			else {
				res.json({ "Error": true, "Message": "wrong email/password combination" });
			}

		}
	});
}

module.exports = userLoginCheck;