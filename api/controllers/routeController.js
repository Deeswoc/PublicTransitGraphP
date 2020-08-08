const routeModel = require('../models/route');
const { NotFound } = require('../models/route/route')
exports.add_new_route = async function (req, res, next){
    try {
        await routeModel.addRoute(req.body);
        res.send(201);
    } catch (error) {
        if(error instanceof NotFound){
            if(req.body.a.missing && req.body.b.missing)
                res.status(409).send("Locations A and B were not found in the database");
            else if(req.body.a.missing){
                res.status(409).send("Location A was not found in the database");
            }else if(req.body.a.missing){
                res.status(409).send("Location B was not found in the database");
            }else
                res.status(500).send(error.stack);
        }     
    }
}