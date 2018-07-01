
var mysql = require("mysql");
var express = require("express");
var jwt = require('jsonwebtoken');
var config = require('../config');
var connection = require("../database");
var formidable = require('formidable');
var fs = require('fs');

var documentUpload = function (req, res) {
    if (req.method == "POST") {
        var decoded, userId;
        try {
            decoded = jwt.verify(req.headers.token, config.secret);
            userId = decoded.user_id;
            //userId = 22;
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                console.log('expdate', fields.expdate);
                console.log('File uploaded');
                var fileData = fs.readFileSync(files.filetoupload.path);
                var mimeType = files.filetoupload.type;
                var fileName = files.filetoupload.name;
                var expdate = fields.expdate;
                var query = "INSERT INTO documents(doc_name,doc_type,user_id,expiryDate,data) VALUES (?,?,?,?,?)";
                connection.query(query, [fileName, mimeType, userId, expdate, fileData], function (err, rows) {
                    if (err) {
                        console.log('error', err);
                        res.json({ "Error": true, "Message": "Error executing query." });
                    } else {
                        console.log("saved");
                        res.json({ "Error": false, "Message": "File upoaded successfully." });
                    }
                });
            });
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
    }
};
module.exports = documentUpload;