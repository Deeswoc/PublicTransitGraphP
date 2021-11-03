const uuid = require('uuid').v4;
const routeTransactions = require('../models/route/routeTransactions');
const driver = require('../config/database');
const { validateTowns } = require('../utils/index');
const { NotFound } = require('../utils/errors');
const routeModel = require('../models/route/route')({
  uuid,
  driver,
  ta: routeTransactions,
  validateTowns,
  NotFound
});


async function addRoute(req, res) {
  try {
    if (typeof validateTowns === 'function') {
      console.log("validating towns");
    } else {
      console.log(typeof validateTowns);
    }
    await routeModel.addRoute(req.body.route);
    res.sendStatus(201);
  } catch (error) {
    if (error instanceof NotFound) {
      res.status(409).json({
        error: error.message,
        status: false,
        IDs: error.missing,
      });
      console.error();
    } else {
      console.error(error);
      res.status(500).json({
        error: error.message,
      });
    }
  }
}

async function getRoutes(req, res) {
  try {

    const routes = await routeModel.getRoutes();
    res.status(200).json(routes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
}

async function getRoute(req, res) {
  try {
    const id = req.params.id;
    const route = await routeModel.getRoute(id);
    if (route)
      res.status(200).json(route);
    else
      res.send(404);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = {
  addRoute,
  getRoutes,
  getRoute,
};
