const
    driver = require('../../config/database'),
    townModel = require('../town/town'),
    ta = require('./routeTransactions'),
    { 
        validateTowns: getValidateTowns,
        addRoute,
        NotFound
    } = require('./route');


let validateTowns = getValidateTowns(townModel.getTown, NotFound, "No town found for some IDs provided on path");
exports.addRoute = addRoute(validateTowns, driver, ta);
