let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next){
    res.render('index', {title:'Public Transit'});
})

module.exports = router;    