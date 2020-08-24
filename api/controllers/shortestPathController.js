const routeModel = require('../models/route');
const { NotFound } = require('../models/route/route');

exports.get_shortest_path = async function (req, res, next) {
    try {
        let 
            townA = req.query.townA,
            townB = req.query.townB,
            path,
            data;   

        data = await routeModel.getShortestPath(townA, townB);
        path = data.records.map(record =>  {return {
            
            item: record.get(0).properties,
            cost: record.get(1)
        }})
        res.status(200).json(path);
    } catch (error) {
        console.error(error);
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