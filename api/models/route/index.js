const
    driver = require('../../config/database'),
    townModel = require('../town/town'),
    ta = require('./routeTransactions'),
    { 
        validateTowns: getValidateTowns,
        addRoute,
        NotFound
    } = require('./route');


let validateTowns = getValidateTowns(townModel.getTown, NotFound);
exports.addRoute = addRoute(validateTowns, driver, ta);
