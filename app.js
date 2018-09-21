const express = require('express');
const session = require('express-session');
const mysqlSessionStore = require('express-mysql-session');
const frontendRouter = require('./routes/frontend');
const backendRouter = require('./routes/backend');

sessionStore = new mysqlSessionStore({host: 'localhost', user: 'root', password: 'qpalzm', database: 'test_system'});

let app = express();
app.use(session({secret: 'QpalzM2468', store: sessionStore, saveUninitialized: false, resave: false, rolling: true, cookie: {maxAge: 43200000, httpOnly: false}, name: 'session_id'}));

app.use('/api/v1/', backendRouter);
app.use('/', frontendRouter);

module.exports = app;