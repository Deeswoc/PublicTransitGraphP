let express = require('express');
let router = express.Router();
let townModel = require('../models/town/town');
router.get('/', function(req, res, next){
    res.render('index', {title:'Public Transit'});
})

router.get('/t', (req, res)=>{
    townModel.getTowns().then(towns=>{
        townArr = [];
        towns.forEach(record=>{
            townArr.push({
                name: record.name,
                //parish: record._fields[0].properties.parish
            })
        })
        res.render('towns', townArr );
    })
})
module.exports = router;    