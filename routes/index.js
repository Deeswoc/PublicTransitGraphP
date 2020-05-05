let express = require('express');
let router = express.Router();
const graph = require('../routes/graphing');
router.get('/', function(req, res, next){
    res.render('index', {title:'Public Transit'});
})

router.get('/t', (req, res)=>{
    graph.getTowns().then(data=>{
        townArr = [];
        data.records.forEach(record=>{
            townArr.push({
                name: record._fields[0].properties.Name,
                parish: record._fields[0].properties.parish
            })
        })
        res.render('towns', townArr);
    })
})
module.exports = router;    