'use-strict'
let express = require('express');
let router = express.Router();
let townController = require('../controllers/townController');

router.post('/add-town', townController.add_new_town);
router.post('/add-towns', townController.add_new_towns);
router.get('/get-towns', townController.get_towns)
router.get('/out-bound-routes/', townController.get_out_bound_routes);
//router.get('/validate-town/:name', graphController.check)
module.exports = router;