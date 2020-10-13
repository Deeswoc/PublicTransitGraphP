exports.getTownTransaction = function (tx, townID){
    return tx.run(
        `
Match (n{uuid:$id})
return n`,
        {id: townID}
    )
}

exports.addTownsTransaction = function (tx, towns){
    return tx.run(
        `
UNWIND $towns as town
MERGE (a:area:Town {Name: town.name, uuid: town.uuid}) with a, town
MATCH (p:parish{Name: town.parish}) with a, p, town
MERGE (a)-[:in]-(p) with a, town
UNWIND town.categories as category
MATCH (c:LocationCategory {uuid: category}) 
MERGE (a)-[:category]-(c)
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
        'MATCH (area)-[:in]->(n:parish) ' +
        'RETURN area, n.Name as parish' 
    )
}


