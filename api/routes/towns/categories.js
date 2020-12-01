const router = require('express').Router();
const uuid = require('uuid').v4;
const driver = require('../../config/database');
const categoryTransactions = require('../../models/town/categories/categoryTransactions');
const categoryModel = require('../../models/town/categories/catagory')({ uuid, driver, ta: categoryTransactions });
const categoriesController = require('../../controllers/categoriesController')({ categoryModel });

router.get('/', categoriesController.getCategories);
router.post('/', categoriesController.addCategories);
module.exports = router;
