const
    driver = require('../../../config/database'),
    ta = require('./categoryTransactions'),
    uuid = require('uuid').v4,
    {
        getCategories: getGetCategories,
        getCategory: getGetCategory,
        addRouteCategory: getAddRouteCategory
    } = require('./category');

exports.getRouteCategories = getGetCategories(driver, ta);
exports.getRouteCategory = getGetCategory(driver, ta);
exports.addRouteCategory = getAddRouteCategory(driver, ta, uuid);