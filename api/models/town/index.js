const uuid = require('uuid').v4;
const driver = require('../../config/database');
const ta = require('./townTransactions');

const town = require('./town')({ driver, uuid, ta });

module.exports = town;
