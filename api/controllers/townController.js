const 
    graph = require('../routes/graphing'),
    townModel = require('../models/town');

exports.get_categories = async(req, res, next) =>{
    try {
        let data = await graph.get_town_categories();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: err.message,
            error: err
        });
    }
}
exports.add_new_towns = async(req, res, next) =>{
    promise = graph.addTowns(req.body.towns);
    promise.then(data=>{
            res.status(201).send({
            success:true,
            message: 'Towns added successfully',
            error:null,
            data:data
        });
    }).catch((err) =>{
        res.status(500).send({
            success: false,
            message: err.message,
            error: err
        })
    }
    )
}

exports.get_out_bound_routes = async(req, res, next) =>{
    promise = graph.getOutBoundRoutes(res, req);
    promise.then(data=>{
        res.status(201).send({
            success:true,
            message:'idk',
            error:null,
            data:data
        })
    }).catch((err) =>{
        session.close();
        driver.close();
        res.status(500).send({
            success: false,
            message: err.message,
            error: err
        });
    });
}

exports.get_town = async(req, res, next) =>{
    try {
        const data = await graph.getTown(req.body.id);
        town = data.records[0]._fields[0].properties;
        res.status(201).json(town);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            error
        });
    }
}

exports.get_towns = async(req, res, next) =>{
    try {
        let towns = await townModel.getTowns();
        res.status(201).json(towns);  
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            error: error
        });
    }
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