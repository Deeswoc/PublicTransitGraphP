const neo4j = require('neo4j-driver');
const driver = require('../config/database');
function addTownTransaction(tx, townName){
    return tx.run(
        'MERGE (a:Town {Name: $name}) ' + 
        'RETURN a', {name: townName}
    )
}

// function getTownTransaction(tx, townID){
//     return tx.run(
//         `
//         Match (n)
//         where id(n) = $id
//         return n`,
//         {id: townID}
//     )
// }

function getRoutes(tx, id){
    return tx.run()
}

function addTownsTransaction(tx, towns){
    return tx.run(
        `
UNWIND $townArray as towns 
UNWIND towns.categories as catName
MATCH (category:LocationCategory {Name: catName}) 
MERGE (a:area {Name: towns.name}) 
MERGE (a)-[:category]-(category)
`, {townArray: towns}
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
    
function getTownCategoriesTransaction(tx){
    return tx.run(
        `MATCH (category:LocationCategory)
        return category
        ORDER BY category.Name
        `
    )
}

    
// exports.addTowns = addTowns;
exports.findTown = findTown;
// exports.getTown = getTowns;
exports.addRoute = addRoute;
exports.checkTown = checkTown;
exports.get_town_categories = getTownCategories;
exports.getOutBoundRoutes = getOutBoundRoutes;
exports.getPassingRoutes = getPassingRoutes;
exports.getRoutesFromTown = getRoutesFromTown;
// exports.getTowns = getTowns;
// exports.addTown = addTown;
    
async function getTownCategories(){
    session = driver.session();
    const data = await session.readTransaction(tx => getTownCategoriesTransaction(tx));
    let categories = [];
    records = data.records
    records.forEach((cat)=>{
        categories.push(cat._fields[0].properties.Name);
    })
    return categories;
}

// async function getTown(townID){
//     session = driver.session();
//     const data = await session.readTransaction(tx => getTownTransaction(tx, townID));
//     return data;
// }

// function addTown(res, townName) {
//     session = driver.session();
//     failed = false;
//     const promise  = session.writeTransaction(tx => addTownTransaction(tx, townName));
//     promise.then(data=>{
//         res.status(201).send({
//             success: true,
//             message: 'Town Added Successfully',
//             error: null,
//             data: data
//         });
//         session.close();
//         // driver.close();
        
//     }).catch((err) =>{
//         session.close();
//         // driver.close();
//         res.status(500).send({
//             success: false,
//             message: err.message,
//             error: err
//         })
//     }
//     )
//     return promise;
// }

// function addTowns(towns){
//     session = driver.session();
//     const promise = session.writeTransaction(tx => addTownsTransaction(tx, towns));
//     promise.catch(err=>{
//         console.log(err.message);
//     }).finally(data=>{
//         session.close();
//         // driver.close();
//     });
//     return promise;
// }


function findTown(tx, townName){
    return tx.run(
        'MATCH (a: Town {Name: $town}) ' +
        'RETURN a', {town: townName}
        )
    }
    
function addRoute(route, bookmarks){
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

// function getTownsTransaction(tx){
//     return tx.run(
//         'MATCH (town:Town) ' +
//         'RETURN (town)'
//     )
// }

// function getTowns(){
//     let session = driver.session();
//     promise = session.readTransaction(tx => getTownsTransaction(tx));
//     promise.then(data=>{
//         session.close;
//     }).catch(err=>{
//         console.log(err.message);
//         session.close;
//     })
//     return promise;
// }

function checkTown(name, Exists, bookmarks){
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

function getOutBoundRoutes(res, req){
    session = driver.session();
    promise = session.readTransaction(tx => findTown(tx, req.query.name));

    return promise;
}