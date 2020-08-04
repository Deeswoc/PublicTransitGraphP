let router  = require('express').Router();
let categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.get_categories);
router.post('/', categoriesController.add_categories);
module.exports = router;