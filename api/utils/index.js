const validator = require('./validateIDs');
const { NotFound } = require('./errors');
const { getTown } = require('../models/town');

module.exports = {
  validateTowns: validator({ NotFound, errorMessage: '1 or more town IDs provided were not found', searchIDs: getTown }),
};
