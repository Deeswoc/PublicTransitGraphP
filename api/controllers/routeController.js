const routeModel = require('../models/route');
const { NotFound } = require('../models/route/route')
exports.add_new_route = async function (req, res, next){
    try {
        await routeModel.addRoute(req.body);
        res.send(201);
    } catch (error) {
        if(error instanceof NotFound){
            res.status(409).json({
                error: error.message,
                status:false,
                IDs: error.missing
            });
        }     
    }
}