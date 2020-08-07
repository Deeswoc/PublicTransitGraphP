const
    driver = require('../../config/database'),
    townModel = require('../town/town'),
    ta = require('./routeTransactions'),
    { 
        validateTowns,
        addRoute,
    } = require('./route');


exports.addRoute = addRoute(validateTowns(townModel.getTown), driver, ta);
