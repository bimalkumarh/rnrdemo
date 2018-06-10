var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'db4free.net',
    user     : 'amiya1_dear',
    password : 'arrahman',
    database : 'rnr1_demo',
    debug    :  true
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;