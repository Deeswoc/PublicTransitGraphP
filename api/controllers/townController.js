const uuid = require('uuid').v4;
const townTransactions = require('../models/town/townTransactions');
const driver = require('../config/database');
const

  townModel = require('../models/town/town')({ uuid, driver, ta: townTransactions });

exports.add_new_towns = async (req, res, next) => {
  try {
    const newTowns = await townModel.addTowns(req.body.towns);
    res.status(201).json(newTowns);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

exports.get_out_bound_routes = async (req, res, next) => {
  res.done();
};

exports.get_town = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const town = await townModel.getTown(id);
    res.status(200).json(town);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

exports.get_towns = async (req, res, next) => {
  try {
    const towns = await townModel.getTowns();
    res.status(200).json(towns);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};
