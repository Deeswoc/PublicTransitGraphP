const routeModel = require('../models/route');
const { NotFound } = require('../models/route/route');

async function addRoute(req, res) {
  try {
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

module.exports = {
  addRoute,
  getRoutes,
};
