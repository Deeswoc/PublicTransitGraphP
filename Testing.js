const uri = 'bolt://localhost:7687';
const user = 'neo4j'
const password = '12345678'
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
    switch(req.url){
        case '/test':{
            session = driver.session();
            const resultPromise = session.writeTransaction(tx =>   
                tx.run(     
                    'CREATE (a:Greeting) SET a.message = $message RETURN a.message + ", from node " + id(a)',     { message: req.headers['message'] }   ) );
            
            
            resultPromise.then(result => {   session.close();   
                const singleRecord = result.records[0];
                const greeting = singleRecord.get(0);
                console.log(greeting);   // on application exit: 
                res.end(greeting);
                driver.close(); 
            })
            
        }
        case '/add-town':{
            session = driver.session();
            const prom  = session.writeTransaction(tx =>{
                addTown(tx, req.headers['townname']);
            });
            
            prom.then(data=>{
                session.close();
                
                res.end(data.records[0].get(0));
                driver.close();
                
            }).catch(data=>{
                session.close();
                
                res.end(data.message);
                driver.close();
            }
            )
            break;
        }
        case '/add-route':{
            town1Exists = false;
            town2Exists = false;
            bookmarks = [];
            session1 = driver.session();
            first = session1.readTransaction(tx => findTown(tx, req.headers['town1']))
            .then(result => {
                if(result)
                    town1Exists = true;
                bookmarks.push(session1.close());
            }).catch(error=>{
                res.end(error.message);
            });
            
            session2 = driver.session();
            second = session2.readTransaction(tx=>{findTown(tx, req.headers['town2'])})
            .then(result => {
                if(result)
                    town2Exists = true;
                bookmarks.push(session2.close());
            }).catch(error => {
                res.end(error.message);
            });
            

            Promise.all([first, second]).then(() => {
                if(town1Exists&&town2Exists){
                    session3 = driver.session(neo4j.WRITE, bookmarks);
                    add = session3.writeTransaction(tx => {addRoute(tx, req.headers['town1'], req.headers['town2'])})
                        //.then(session.writeTransaction((result)=>{addRoute(tx, req.headers['town1'], req.headers['town2'])}))
                        .then(result=>{
                            console.log(result);
                            res.end(result.record[0].get(0));
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

function addTown(tx, townName){
    tx.run(
        'CREATE (a:Town {Name: $name}) ' + 
        'RETURN a', {name: townName}
    )
}

function findTown(tx, townName){
    tx.run(
        'MATCH (a: Town {Name: $town}) ' +
        'RETURN a', {town: townName}
    )
}

function addRoute(tx, townA, townB){
    tx.run(
        'MATCH (a:Town {Name: $towna}) ' +
        'MATCH (b:Town {Name: $townb}) ' +
        //'MERGE (a)<-[:toFrom]-(taxi:Taxi)-[:toFrom]->(b)' +
        'MERGE (a)-->(b) ' +
        'RETURN a + b'
        , {towna:townA, townb:townB}
     )
}
