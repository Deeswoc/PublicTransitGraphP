const
    driver = require('../../config/database'),
    townModel = require('../town/town'),
    ta = require('./routeTransactions'),
    { 
        validateTowns: getValidateTowns,
        addRoute,
        getRoutes,
        getShortestPath,
        NotFound
    } = require('./route');


let validateTowns = getValidateTowns(townModel.getTown(driver, require('../town/townTransactions')), NotFound, "No town found for some IDs provided on path");
exports.addRoute = addRoute(validateTowns, driver, ta);
exports.getRoutes = getRoutes(driver, ta);
exports.getShortestPath = getShortestPath(validateTowns, driver, ta);