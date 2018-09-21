if (typeof db === 'undefined') {
    db = require('../helpers/db')();
}
const utils = require('../helpers/utils');

const create = function (userData, callback) {
    if (utils.checkObject(userData, ['name', 'username', 'email', 'phone', 'password'], function (value) {
        return value.length > 0;
    })) {
        db.query('SELECT id FROM users WHERE username = ? OR email = ?', [userData.username, userData.email], function (error, usersData) {
            if (!error) {
                if (usersData.length === 0) {
                    db.query('INSERT INTO users SET name = ?, username = ?, email = ?, phone = ?, password = ?', [userData.name, userData.username, userData.email, userData.phone, userData.password], function (error, results) {
                        if (!error) {
                            callback(null, results.insertId);
                        } else {
                            callback('unknown', null);
                        }
                    });
                } else {
                    callback('email_or_username_is_already_taken', null);
                }
            } else {
                callback('unknown', null);
            }
        });
    } else {
        callback('required_params_are_missed', null);
    }
};
const getIdByCredentials = function (credentials, callback) {
    if (utils.checkObject(credentials, ['email', 'password'], function (value) {
        return value.length > 0;
    })) {
        db.query('SELECT id FROM users WHERE email = ? AND password = ?', [credentials.email, credentials.password], function (error, results) {
            if (!error) {
                if (results.length > 0) {
                    callback(null, results[0].id);
                } else {
                    callback('email_or_password_is_incorrect', null);
                }
            } else {
                callback('unknown', null);
            }
        });
    } else {
        callback('required_params_are_missed', null);
    }
};
const getById = function (id, callback) {
    if (typeof id !== 'undefined') {
        db.query('SELECT name, username, email, phone, password FROM users WHERE id = ?', [id], function (error, results) {
            if (!error) {
                if (results.length > 0) {
                    callback(null, results[0]);
                } else {
                    callback('user_doesnt_exist', null);
                }
            } else {
                callback('unknown', null);
            }
        });
    } else {
        callback('required_params_are_missed', null);
    }
};

module.exports = {
    create,
    getIdByCredentials,
    getById
};