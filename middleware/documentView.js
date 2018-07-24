var connection = require("../database");;
var fs = require('fs');

var documentView = function (req, res) {
    var documentId = req.params.documentId;
    var query = "select  * FROM documents WHERE id=?";
    connection.query(query, [documentId], function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            var buf = new Buffer(rows[0].data);
            fs.writeFile('public/downloads/' + rows[0].doc_name, buf);
            fs.readFile('public/downloads/' + rows[0].doc_name, function (err, data) {
                res.contentType(rows[0].doc_type);
                res.send(data);
            });
        }
    });
};
module.exports = documentView;

