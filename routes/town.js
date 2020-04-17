'use-strict'
let express = require('express');
let router = express.Router();
let graphController = require('../controllers/graphController')

router.post('/add-town', graphController.add_new_town);

module.exports = router;