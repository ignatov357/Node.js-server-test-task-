const express = require('express');
const path = require('path');

let router = express.Router();
router.use(express.static(path.join(__dirname, '../public')));

let viewsDirectory = path.join(__dirname, '../views');
router.all('*', (req, res) => {
    res.sendFile(`${viewsDirectory}/index.html`);
});

module.exports = router;