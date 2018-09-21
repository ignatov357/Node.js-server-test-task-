const express = require('express');
const session = require('express-session');
const mysqlSessionStore = require('express-mysql-session');
const {dbConnectionSettings, expressSessionSettings} = require('./helpers/config');
const frontendRouter = require('./routes/frontend');
const backendRouter = require('./routes/backend');

sessionStore = new mysqlSessionStore({
    host: dbConnectionSettings.host,
    user: dbConnectionSettings.user,
    password: dbConnectionSettings.password,
    database: dbConnectionSettings.database
});

let app = express();
app.use(session({
    ...expressSessionSettings,
    store: sessionStore
}));

app.use('/api/v1/', backendRouter);
app.use('/', frontendRouter);

module.exports = app;