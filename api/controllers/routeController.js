const routeModel = require('../models/route');
const { NotFound } = require('../models/route/route')
exports.add_new_route = async function (req, res, next) {
    try {
        await routeModel.addRoute(req.body);
        res.sendStatus(201);
    } catch (error) {
        if (error instanceof NotFound) {
            res.status(409).json({
                error: error.message,
                status: false,
                IDs: error.missing
            });
        } else (
            res.status(500).json({
                error: error.message
            })
        )
    }
}

exports.get_routes = async function (req, res, next) {
    try {
        routes = await routeModel.getRoutes();
        res.status(200).json(routes);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        })
    }
}

