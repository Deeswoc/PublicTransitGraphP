'use-strict'
let express = require('express');
let router = express.Router();
let routeController = require('../controllers/routeController.js')
let shortestPath = require('./routes/shortestPath');
let categoriesRouter = require('./routes/category')
router.post('/', routeController.add_new_route);
router.get('/', routeController.get_routes);
router.use('/shortest-path', shortestPath);
router.use('/categories', categoriesRouter);
module.exports = router;