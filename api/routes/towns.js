'use-strict'
let express = require('express');
let router = express.Router();
let categoriesRouter = require('./towns/categories');
let townController = require('../controllers/townController');

router.use('/categories', categoriesRouter);
router.post('/', townController.add_new_towns);
router.get('/', townController.get_towns);
router.get('/:id', townController.get_town);
module.exports = router;