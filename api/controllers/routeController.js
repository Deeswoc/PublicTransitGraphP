const neo4j = require('neo4j-driver');
const uri = 'bolt://localhost:7687';
const user = 'neo4j';
const password = 'testt3$t56%';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const routeModel = require('../models/route');
let path = require("path");
let graph = require('../routes/graphing')


exports.add_new_route = async function (req, res, next){
        try {
            await routeModel.addRoute(req.body);
            res.send(201);
        } catch (error) {
            if(error == 'LocationsNotFound'){
                res.status(409);
            }else if(error == 'LocationANotFound'){
                res.status(409);
            }else if(error == 'LocationBNotFound'){
                res.status(409);
            }
            res.status(500).send(error.stack);
        }
        
        // let town1Exists = {exists: false};
        // let a = await townModel.getTown(req.body.townA);


        // let town2Exists = {exists: false};
        // let route = req.body.route;
        // let bookmarks = [];
        
        // let first = graph.checkTown(route.townA, town1Exists, bookmarks);
        // let second = graph.checkTown(route.townB, town2Exists, bookmarks);

        // //After the promises have been resovled and the existence of the towns has been verified the response is handled
        // Promise.all([first, second]).then(() => {
        //     town1Exists = town1Exists.exists;
        //     town2Exists = town2Exists.exists;
            
            // if(town1Exists&&town2Exists){
            //         promise = graph.addRoute(route, bookmarks);
            //         promise.then(data=>{
            //             res.status(201).send({
            //                 success:true,
            //                 message: 'Towns added successfully',
            //                 error:null,
            //                 data:data
            //             })
            //         }).catch(error=>{
            //             res.status(201).send({
            //                 success:true,
            //                 message: error.message,
            //                 error:error
            //             })
            //         });
            // }else if(!town1Exists&&!town2Exists){
            //     res.status(201).send({
            //         success:true,
            //         message: route.townA + ' and ' + route.townB + ' were not found in the database',
            //         error:null,
            //         data:{
            //             townA:route.townA,
            //             townB:route.townA
            //         }
            //     })
            // }else if(!town1Exists){
            //     res.status(201).send({
            //         success:true,
            //         message: route.townA + ' was not found in the database',
            //         error:null,
            //         data:{townA:route.townA}
            //     })
            // }else if(!town2Exists){
            //     res.status(201).send({
            //         success:true,
            //         message: route.townB + ' was not found in the database',
            //         error:null,
            //         data:{townB:route.townA}
            //     });
            // }
        // }).catch(error=>{
        //     res.status(500).send({
        //         success: false,
        //         message: error.message,
        //         error: error
        //     })
        // });
}