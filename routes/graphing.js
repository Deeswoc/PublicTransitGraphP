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
/*
exports.addTown =(res, townName)=>{
    session = driver.session();
    const promise  = session.writeTransaction(tx => addTownTransaction(tx, townName));

    promise.then(data=>{
        res.end(data.records[0].get(0).properties.Name + ' was added');
        session.close();
        driver.close();
        
    }).catch(data=>{
        session.close();
        res.end(data.message);
        driver.close();
    }
    )
}*/

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

exports.findTown = findTown;

function findTown(tx, townName){
    return tx.run(
        'MATCH (a: Town {Name: $town}) ' +
        'RETURN a', {town: townName}
    )
}

exports.addRoute = function addRoute(tx, params){
    return tx.run(

        'MATCH (towna:Town {Name: $towna}) \n' +
        'MATCH (townb:Town {Name: $townb}) \n' +
        
        'MERGE (towna)<-[:toFrom]-(v'+ params['medium'] +')-[:toFrom]-(townb) \n'  + 
        (params['corporate']?'SET v:Corporate ':'') +
        'SET v.Name = towna.Name + \'/\' + townb.Name \n' +
        'SET v.adultFare = $adultFare \n' +
        
       
        'RETURN towna, townb'
        , {towna:params['town1'], townb:params['town2'], adultFare:params['adultfare'], corporate:params['corporate']}
     )
}

exports.checkTown = function checkTown(name, Exists){
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