const mysql = require('mysql');
const {dbConnectionSettings} = require('../helpers/config');

module.exports = function (errorCallback) {
    let db = mysql.createConnection(dbConnectionSettings);

    db.connect((error) => {
        if (error) {
            errorCallback(error);
        }
    });

    return db;
};