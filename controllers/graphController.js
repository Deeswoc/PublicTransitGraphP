
const graph = require('../routes/graphing');
    
exports.add_new_town = async(req, res,next) =>{
    await graph.addTown(res, req.body.town);
    
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