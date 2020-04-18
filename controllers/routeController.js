let path = require("path");
let graph = require('../routes/graphing')
exports.add_new_route = function (req, res, next){
        let town1Exists = {exists: false};
        let town2Exists = {exists: false};
        let bookmarks = [];
        
        let first = graph.checkTown(req.body.route.townA, town1Exists);
        let second = graph.checkTown(req.body.route.townB, town2Exists)
        Promise.all([first, second]).then(() => {
            town1Exists = town1Exists.exists;
            town2Exists = town2Exists.exists;
            
            if(town1Exists&&town2Exists){
                let session3 = driver.session(neo4j.WRITE, bookmarks);
                session3.writeTransaction(tx => graph.addRoute(tx, req.body.route))
                    .then(data=>{
                        res.status(201).send({
                            success:true,
                            message: 'Towns added successfully',
                            error:null,
                            data:data
                        })
                    }).catch(error=>{
                        res.status(201).send({
                            success:true,
                            message: error.message,
                            error:error
                        })
                    });
            }else if(!town1Exists&&!town2Exists){
                res.status(201).send({
                    success:true,
                    message: req.body.route.townA + ' and ' + req.body.route.townB + ' were not found in the database',
                    error:null,
                    data:{
                        townA:req.body.route.townA,
                        townB:req.body.route.townA
                    }
                })
                //res.end(req.headers['town1'] + ' ' + req.headers['town2'] + ' were not found in the database');
            }else if(!town1Exists){
                res.status(201).send({
                    success:true,
                    message: req.body.route.townA + ' was not found in the database',
                    error:null,
                    data:{
                        townA:req.body.route.townA,
                    }
                })
                //res.end(req.headers['town1'] + ' was not found in the database');
            }else if(!town2Exists){
                res.status(201).send({
                    success:true,
                    message: req.body.route.townB + ' was not found in the database',
                    error:null,
                    data:{
                        townB:req.body.route.townA
                    }                })
                //res.end(req.headers['town2'] + ' was not found in the database');
            }
        }).catch(error=>{
            res.end(error.message);
        });
}