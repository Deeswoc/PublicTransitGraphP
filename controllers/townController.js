    const graph = require('../routes/graphing');

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

exports.get_towns = async(req, res, next) =>{
    promise = graph.getTowns();
    promise.then(data=>{
        let townArr = [];
        data.records.forEach(element => {
            townArr.push({
                name: element._fields[0].properties.Name,
                parish: element._fields[0].properties.parish
            })
        });
        res.status(201).json(townArr);
    }).catch(err=>{
        res.status(500).send({
            success: false,
            message: err.message,
            error: err
        });
    })
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