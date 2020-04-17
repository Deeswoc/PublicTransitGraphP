'use-strict'
let express = require('express');
let router = express.Router();
let 
const graph = require('../routes/graphing');

exports.add_new_town = async(req, res,next) =>{
    promise = graph.addTown(res, req.body.town);
    
    // try{
    //     if(err)
    //         throw err;
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