'use-strict'
let express = require('express');
let router = express.Router();
let graphController = require('../controllers/graphController')

router.post('/add-town', graphController.add_new_town);
router.post('/add-towns', graphController.add_new_towns);
router.get('/out-bound-routes/', graphController.get_out_bound_routes);
//router.get('/validate-town/:name', graphController.check)
module.exports = router;