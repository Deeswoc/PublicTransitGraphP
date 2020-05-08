'use-strict'
let express = require('express');
var path = require('path');
let router = express.Router(); 

router.get('/*', (req, res, next) => {
    //let out = path.join(__dirname, '../', 'public', 'app.html');
    res.sendFile(path.join(__dirname, '../', 'react-app', 'app.html'));
})

module.exports = router;