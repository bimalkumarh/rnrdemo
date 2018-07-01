
var mysql = require("mysql");
var express = require("express");
var jwt = require('jsonwebtoken');
var config = require('../config');
var connection = require("../database");
var formidable = require('formidable');
var fs = require('fs');

var documentDelete = function (req, res) {
    var documentId = req.params.documentId;
    var query = "DELETE FROM documents WHERE id=?";
    connection.query(query, [documentId], function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            res.json({ "Error": true, "Message": "Document deleted successfully." });
        }
    });
};

module.exports = documentDelete;