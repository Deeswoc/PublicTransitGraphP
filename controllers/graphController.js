
const graph = require('../routes/graphing');
exports.add_new_route = async(req, res, next) =>{
    
}

exports.add_new_towns = async(req, res, next) =>{
    graph.addTowns(res, req.body.towns);
}

exports.get_out_bound_routes = async(req, res, next) =>{
    graph.getOutBoundRoutes(res, req)
}

exports.validate = async(req, res, next) =>{
    graph.checkTown(req.head.name).then((result) => {
        if(result)
            re
    });
}

exports.add_new_town = async(req, res,next) =>{
    graph.addTown(res, req.body.town);
    

    // try{
    //     await graph.addTown(res, req.body.town);

    //     res.status(201).send({
    //         success: true,
    //         error: null,
    //         message: 'Town added successfully'
    //     })
    // }catch(err){
    //     res.status(500).send({
    //         error: err,
    //         message: 'An error occoured when adding new town',
    //         data: req.body.town
    //     })
    // }
}