const dbConnectionSettings = {
    host: "localhost",
    user: "root",
    password: "qpalzm",
    database: "test_system",
    multipleStatements: true
};
const expressSessionSettings = {
    secret: 'QpalzM2468',
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {maxAge: 43200000, httpOnly: false},
    name: 'session_id'
};

module.exports = {
    dbConnectionSettings,
    expressSessionSettings
};