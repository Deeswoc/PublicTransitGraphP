'use-strict';

const express = require('express');
const categoriesRouter = require('./towns/categories');
const townController = require('../controllers/townController');

const router = express.Router();

router.use('/categories', categoriesRouter);
router.post('/', townController.add_new_towns);
router.get('/', townController.get_towns);
router.get('/:id', townController.get_town);
module.exports = router;
