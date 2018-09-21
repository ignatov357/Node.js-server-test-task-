if(typeof mysql === "undefined") {
    mysql = require('mysql');
}

module.exports = function(errorCallback) {
	var db = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "qpalzm",
		database: "test_system",
		multipleStatements: true
	});

	db.connect(function(error) {
		if(error) {
			errorCallback(error);
		}
	});

	return db;
}