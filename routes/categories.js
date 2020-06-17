let router  = require('express').Router();
let categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.get_categories);
router.get('/test', categoriesController.test)
module.exports = router;