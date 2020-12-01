const uuid = require('uuid').v4;
const driver = require('../../config/database');
const townModel = require('../town');
const ta = require('./routeTransactions');
const { validateTowns } = require('../../utils/index');

const route = require('./route')({
  driver,
  townModel,
  ta,
  uuid,
  getTown: townModel.getTown,
  validateTowns,
});

module.exports = route;
