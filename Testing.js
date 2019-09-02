'use strict';

const uri = 'bolt://localhost:7687';
const bodParse =  require('./body methods.js')
const url = require('url'); 
const user = 'neo4j'
const password = '12345678'
const ejs = require('ejs');
const graph = require('./routes/graphing.js')
const http = require('http');
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const server = http.createServer((req, res)=>{        
    switch(req.url.split('?')[0]){
        case '/get-routes':{
            params = bodParse.bodyJSON(req);
            let currentUrl = url.parse(req.url, true);
            let town = {name: '', runsTo: [], routesPassThrough: []};
            town.name = currentUrl.query['town'];
            if(town!==undefined){ 
                town.name = town.name.charAt(0).toUpperCase() + town.name.slice(1)
                let session = driver.session();
                const promise = session.readTransaction(tx=>graph.getRoutesFromTown(tx, town.name));
                promise.then(result=>{
                    town.runsTo = result.records[0].get('town.Name');
                    let out = JSON.stringify(town);
                    res.writeHead(200, "content-type: application/json");
                    res.end(out);
                }).catch(error=>{
                    res.end(error.message);
                })
            }else
                res.end('Town Was not provided');
            break;
        }
        case '/test':{
            session = driver.session();
            const resultPromise = session.writeTransaction(tx =>   
                tx.run(     
                    'MATCH (a: Town {Name: $town}) ' +
                    'RETURN a',   {town: req.headers['message'] }   ) );
            
            
            resultPromise.then(result => {   session.close();   
                const singleRecord = result.records[0];
                const greeting = singleRecord.get(0);
                console.log(greeting);   // on application exit: 
                res.end(greeting);
            }).catch(error=>{
                res.end(error.message);     
            })
            
        }
        case '/add-town':{
            bodParse.bodyJSON(req, (params)=>{
                let town = JSON.parse(params);
                graph.addTown(res, town.name);

            })

            //graph.addTown(res, req.headers['townname']);

            break;
        }
        case '/add-route':{
            bodParse.bodyJSON(req,
                (params)=>{
                    console.log(params);
                    return;
                });
            if(req.headers["content-type"]!=='application/json'){
                break;
            }
            return;
            
                //params =  bodParse.bodyJSON(req);

                town1Exists = {exists: false}
                town2Exists = {exists: false};
                town = req.headers;
                bookmarks = [];
                session1 = driver.session();
                
                
                first = graph.checkTown(town['town1'], town1Exists);
                second = graph.checkTown(town['town2'], town2Exists)
                Promise.all([first, second]).then(() => {
                    town1Exists = town1Exists.exists;
                    town2Exists = town2Exists.exists;
                    
                    if(town1Exists&&town2Exists){
                        session3 = driver.session(neo4j.WRITE, bookmarks);
                        add = session3.writeTransaction(tx => graph.addRoute(tx, req.headers))
                            .then(result=>{
                                console.log(result);
                                thingy = result.records[0].get(0);
                                res.end(result.records[0].get('towna').properties.Name+ ' is now connected to ' + result.records[0].get('townb').properties['Name']);
                            })
                            .catch(error=>{
                                res.end(error.message)
                            });
                    }else if(!town1Exists&&!town2Exists){
                        res.end(req.headers['town1'] + ' ' + req.headers['town2'] + ' were not found in the database');
                    }else if(!town1Exists){
                        res.end(req.headers['town1'] + ' was not found in the database');
                    }else if(!town2Exists){
                        res.end(req.headers['town2'] + ' was not found in the database');
                    }
                }).catch(error=>{
                    res.end(error.message);
                })
            //})

            break;
        }
        default:{
            res.writeHead(404);
            res.end('Error: Invalid Url');
        }
    }
})

server.listen(80)