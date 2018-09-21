const express = require('express');
const userModel = require('../models/user');

let router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.use((req, res, next) => {
    // FOR DEVELOPMENT ONLY, SHOULD BE CHANGED
    res.header("Access-Control-Allow-Origin", "http://188.127.251.44:8080");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

router.post('/register/', (req, res) => {
    userModel.create(req.body, (error, resultId) => {
        if (!error) {
            req.session.userId = resultId;
            res.status(200);
            res.json({message: 'You have successfully registered'});
        } else {
            if (error === 'required_params_are_missed') {
                res.status(400);
                res.json({errorMessage: 'Some of the required parameters are missed'});
            } else if (error === 'email_or_username_is_already_taken') {
                res.status(400);
                res.json({errorMessage: 'Email or username is already taken'});
            } else {
                res.status(500);
                res.json({errorMessage: 'Unknown error has been encountered, please try again later'});
            }
        }
    });
});
router.post('/login/', (req, res) => {
    userModel.getIdByCredentials(req.body, (error, resultId) => {
        if (!error) {
            req.session.userId = resultId;
            res.status(200);
            res.json({message: 'You have successfully logged in'});
        } else {
            if (error === 'required_params_are_missed') {
                res.status(400);
                res.json({errorMessage: 'Some of the required parameters are missed'});
            } else if (error === 'email_or_password_is_incorrect') {
                res.status(400);
                res.json({errorMessage: 'The email or password you entered is incorrect'});
            } else {
                res.status(500);
                res.json({errorMessage: 'Unknown error has been encountered, please try again later'});
            }
        }
    });
});
router.get('/user_data/', (req, res) => {
    userModel.getById(req.session.userId, (error, result) => {
        if (!error) {
            res.status(200);
            res.json(result);
        } else {
            if (error === 'required_params_are_missed') {
                res.status(400);
                res.json({errorMessage: 'You\'re not authorized'});
            } else if (error === 'user_doesnt_exist') {
                sessionStore.destroy(req.sessionID);
                res.status(400);
                res.json({errorMessage: 'You\'re not authorized'});
            } else {
                res.status(500);
                res.json({errorMessage: 'Unknown error has been encountered, please try again later'});
            }
        }
    });
});
router.post('/logout/', (req, res) => {
    sessionStore.destroy(req.sessionID, (error) => {
        res.json({message: 'You have successfully logged out'});
    });
});

router.options('*', (req, res) => {
    res.end();
});
router.all('*', (req, res) => {
    res.status(404);
    res.json({errorMessage: 'Invalid API method'});
});

module.exports = router;