let 
    router = require('express').Router(),
    routeCategoryController = require('../../controllers/routes/categoriesController');


router.get('/', routeCategoryController.get_categories);
router.get('/:id', routeCategoryController.get_category);
router.post('/', routeCategoryController.add_category);
module.exports = router;