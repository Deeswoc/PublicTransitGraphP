let 
    router = require('express').Router(),
    shortestPathController = require('../../controllers/shortestPathController');
    
router.get('/', shortestPathController.get_shortest_path);

module.exports = router;