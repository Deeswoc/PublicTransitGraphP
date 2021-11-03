'use-strict';

const express = require('express');

const router = express.Router();
const routeController = require('../controllers/routeController.js');
const shortestPath = require('./routes/shortestPath');
const categoriesRouter = require('./routes/category');

router.post('/', routeController.addRoute);
router.get('/', routeController.getRoutes);
router.get('/:id', routeController.getRoute);
router.use('/shortest-path', shortestPath);
router.use('/categories', categoriesRouter);
module.exports = router;
