const uri = 'bolt://localhost:7687';
const user = 'neo4j'
const password = '12345678'
const graph = require('./routes/graphing.js')
const http = require('http');
neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
/*const session = driver.session();
const resultPromise = session.writeTransaction(tx =>   
    tx.run(     
        'CREATE (a:Greeting) SET a.message = $message RETURN a.message + ", from node " + id(a)',     { message: 'hello, world' }   ) );


resultPromise.then(result => {   session.close();   
    const singleRecord = result.records[0];
    const greeting = singleRecord.get(0);
    console.log(greeting);   // on application exit: 
    driver.close(); 
})
*/

server = http.createServer((req, res)=>{        
    switch(req.url.split('?')[0]){
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
            graph.addTown(res, req.headers['townname']);
/*            session = driver.session();
            const prom  = session.writeTransaction(tx =>{
                graph.addTown(tx, req.headers['townname']);
            });
            
            prom.then(data=>{
                
                
                res.end(data.records[0].get(0));
                session.close();
                driver.close();
                
            }).catch(data=>{
                session.close();
                
                res.end(data.message);
                driver.close();
            }
            )*/
            
            break;
        }
        case '/add-route':{
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
            break;
        }
        default:{
            res.writeHead(404);
            res.end('Error: Invalid Url');
        }
    }
})

server.listen(80)
/*
function addTown(tx, townName){
    tx.run(
        'CREATE (a:Town {Name: $name}) ' + 
        'RETURN a', {name: townName}
    )
}

function findTown(tx, townName){
    return tx.run(
        'MATCH (a: Town {Name: $town}) ' +
        'RETURN a', {town: townName}
    )
}

function addRoute(tx, params){
    return tx.run(
        'MATCH (a:Town {Name: $towna}) ' +
        'MATCH (b:Town {Name: $townb}) ' +
        'MERGE (a)-[:toFrom]->(b) ' +
        'RETURN a, b'
        , {towna:params['town1'], townb:params['town2']}
     )
}

function checkTown(name, Exists){
    townExists = false;
    session = driver.session();
    promise = session.readTransaction(tx => findTown(tx, name));
    promise.then(result => {
        if(result)
            Exists.exists = true;
        bookmarks.push(session1.close());
    }).catch(error=>{
        res.end(error.message);
    });
    return promise;
}
*/