'use-strict'
let express = require('express');
let router = express.Router();
let routeController = require('../controllers/routeController.js')

router.post('/add-route', routeController.add_new_route);
// router.post('/add-routes', routeController.add_new_routes);
// router.post('/add-town-to-route', routeController.add_town_to_route)
// router.get('/get-towns-on-route', routeController.get_towns_on_routes);
//router.get('/validate-town/:name', graphController.check)
module.exports = router;