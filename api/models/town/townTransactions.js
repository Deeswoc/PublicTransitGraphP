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

CREATE (temp) with temp
UNWIND $towns as town
MERGE (a:area:Town {Name: town.name, uuid: town.uuid}) with a, town, temp
MATCH (p:parish{Name: town.parish}) with a, p, town, temp
MERGE (a)-[:in]-(p) with a, town, temp
OPTIONAL MATCH (c:LocationCategory {uuid: town.category}) where c.uuid in town.categories and not exists((a)-[:category]-(c)) with a, coalesce(c, temp) as c2, temp
CREATE (a)-[r:category]->(c2)  with temp, a
DETACH DELETE temp
return a as n
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

exports.deleteTown

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


