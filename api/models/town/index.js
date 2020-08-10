const
    driver = require('../../config/database'),
    ta = require('./townTransactions'), 
    uuid = require('uuid').v4,
    {
        getTown: getGetTown,
        getTowns: getGetTowns,
        addTowns: getAddTowns
    } = require('./town');



exports.getTown = getGetTown(driver, ta);
exports.getTowns = getGetTowns(driver, ta);
exports.addTowns = getAddTowns(driver, ta, uuid);