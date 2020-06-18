'use-strict'
let express = require('express');
let router = express.Router();
let categoriesRouter = require('./categories');
let townController = require('../controllers/townController');

// router.post('/add-town', townController.add_new_town);
// router.post('/add-towns', townController.add_new_towns);
// router.get('/get-towns', townController.get_towns)
// router.get('/get-categories', townController.get_categories);
// router.get('/get-towns/:id', townController.get_town)
// router.get('/out-bound-routes/', townController.get_out_bound_routes);

router.use('/categories', categoriesRouter);
router.post('/', townController.add_new_towns);
router.get('/', townController.get_towns);
router.get('/:id', townController.get_town);
module.exports = router;