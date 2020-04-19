const neo4j = require('neo4j-driver');
const uri = 'bolt://localhost:7687';
const user = 'neo4j';
const password = 'testt3$t56%';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
function addTownTransaction(tx, townName){
    return tx.run(
        'MERGE (a:Town {Name: $name}) ' + 
        'RETURN a', {name: townName}
    )
}

function addTownsTransaction(tx, towns){
    return tx.run(
        'UNWIND $townArray as towns ' +
        'MERGE (a:Town {Name: towns.name}) ' +
        'SET a.parish = towns.parish ' +
        'RETURN a', {townArray: towns}
    )
}

function getRoutesFromTown(tx, town){
    return tx.run(
        'MATCH (:Town {Name:$name})<-[:toFrom]-()-[:toFrom]->(town:Town) ' +
        'return town.Name',
        {name: town}
    )
}

function getPassingRoutes(tx, town){
    return tx.run(
        'MATCH (:Town {Name:$name})<-[:toFrom]-()-[:passesThrough]->(town:Town) ' +
        'return town',
        {name: town}
    )
}



exports.getPassingRoutes = getPassingRoutes;
exports.getRoutesFromTown = getRoutesFromTown;


exports.addTown = (res, townName) => {
    session = driver.session();
    failed = false;
    const promise  = session.writeTransaction(tx => addTownTransaction(tx, townName));
    promise.then(data=>{
        res.status(201).send({
            success: true,
            message: 'Town Added Successfully',
            error: null,
            data: data
        });
        session.close();
        driver.close();
        
    }).catch((err) =>{
        session.close();
        driver.close();
        res.status(500).send({
            success: false,
            message: err.message,
            error: err
        })
    }
    )
    return promise;
}

exports.addTowns = function(res, towns){
    session = driver.session();
    const promise = session.writeTransaction(tx => addTownsTransaction(tx, towns));
    promise.catch(err=>{
        console.log(err.message)
    }).finally(data=>{
        session.close();
        driver.close();
    });
    return promise;
}

exports.findTown = findTown;

function findTown(tx, townName){
    return tx.run(
        'MATCH (a: Town {Name: $town}) ' +
        'RETURN a', {town: townName}
    )
}

exports.addRoute = function (route, bookmarks){
    let session = driver.session(neo4j.WRITE);      
    let promise = session.writeTransaction(tx => addRouteTransaction(tx, route));
    promise.catch(error=>{
        console.log(error.message);
    }).finally(data=>{
        // driver.close();
        session.close();
    })
    return promise;
}



function addRouteTransaction(tx, route){
    return tx.run(

        'MATCH (towna:Town {Name: $townA}) \n' +
        'MATCH (townb:Town {Name: $townB}) \n' +
        
        'MERGE (towna)<-[:toFrom]-(v:'+ route.transport +')-[:toFrom]-(townb) \n'  + 
        (route.corporate?'SET v:Corporate ':'') +
        'SET v.Name = towna.Name + \'/\' + townb.Name \n' +
        'SET v.adultFare = $adultFare \n' +
        
       
        'RETURN towna, townb'
        , {townA:route.townA, townB:route.townB, adultFare:route.adultFare, corporate:route.corporate}
     )
}

function addRoute(tx, route){
    return tx.run(

        'MATCH (towna:Town {Name: $townA}) \n' +
        'MATCH (townb:Town {Name: $townB}) \n' +
        
        'MERGE (towna)<-[:toFrom]-(v:'+ route.transport +')-[:toFrom]-(townb) \n'  + 
        (route.corporate?'SET v:Corporate ':'') +
        'SET v.Name = towna.Name + \'/\' + townb.Name \n' +
        'SET v.adultFare = $adultFare \n' +
        
       
        'RETURN towna, townb'
        , {townA:route.townA, townB:route.townB, adultFare:route.adultFare, corporate:route.corporate}
     )
}


exports.checkTown = function checkTown(name, Exists, bookmarks){
    townExists = false;
    session = driver.session();
    promise = session.readTransaction(tx => findTown(tx, name));
    promise.then(result => {
        if(result)
            Exists.exists = true;
        bookmarks.push(session.close());
        // driver.close();
    }).catch(error=>{
        console.log(error.message);
        session.close();
        // driver.close();
    })
    return promise;
}

exports.getOutBoundRoutes = function(res, req){
    session = driver.session();
    promise = session.readTransaction(tx => findTown(tx, req.query.name));

    return promise;
}