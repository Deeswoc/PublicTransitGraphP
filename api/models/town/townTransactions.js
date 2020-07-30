exports.addTownTransaction = function (tx, townName){
    return tx.run(
'MERGE (a:Town {Name: $name}) ' + 
'RETURN a', {name: townName}
    )
}

exports.getTownTransaction = function (tx, townID){
    return tx.run(
        `
Match (n)
where id(n) = $id
return n`,
        {id: townID}
    )
}

exports.addTownsTransaction = function (tx, towns){
    return tx.run(
        `
UNWIND $towns as town
MERGE (a:area {Name: town.name}) with a
UNWIND a.categories as catName
MATCH (category:LocationCategory {Name: catName}) 
MERGE (a)-[:category]-(category)
RETURN (a)
`, {towns}
    )
}

exports.getRoutesFromTown = function (tx, town){
    return tx.run(
        'MATCH (:Town {Name:$name})<-[:toFrom]-()-[:toFrom]->(town:Town) ' +
        'return town.Name',
        {name: town}
    )
}

exports.getPassingRoutes = function (tx, town){
    return tx.run(
        'MATCH (:Town {Name:$name})<-[:toFrom]-()-[:passesThrough]->(town:Town) ' +
        'return town',
        {name: town}
    )
}
    
exports.getTownCategoriesTransaction = function (tx){
    return tx.run(
        `MATCH (category:LocationCategory)
        return category
        ORDER BY category.Name
        `
    )
}

exports.getTownsTransaction = function (tx){
    return tx.run(
        'MATCH (town:Town) ' +
        'RETURN (town)'
    )
}


