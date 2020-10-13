exports.addRouteTransaction = function (tx, matrix) {

    // console.log("Route: ", matrix.map((town)=>{return town.uuid}));
    // console.log("fareMatrix", {pickUp: matrix});
    // matrix.forEach((item, i) => {
    //     console.log("DropOff ", i, " ", item.dropOff);
    // })
    // console.log("Origin Fare", 120);
    return tx.run(
        `
        //Create Route With matrix 1.2

        // towns => array of IDs that lists the path of the from one endpoint to the other
        WITH $route as towns
        
        // Find Origin Nodes
        // x => EndPoint Node
        // y => EndPoint Node
        MATCH (x:area{uuid:towns[0]}) WITH x, towns
        MATCH (y:area{uuid:last(towns)}) WITH x, y, towns
        
        // Create Route/Transit Node
        // r => Transit Node
        MERGE (x)-[:origin{fare:0}]->(r:transit{Name:x.Name + " to " + y.Name})-[:origin{fare:$originFare}]->(y) with x, r, y, towns
        MERGE (x)<-[:origin{fare:$originFare}]-(r)<-[:origin{fare:0}]-(y) with x, y, r, towns
        
        // Adds the via relationship between the Transit Node and the towns on its route between the endpoints
        // n => nodes on route that aren't the origin
        MATCH (n:area) where n.uuid in towns and not exists((r)-[:origin]-(n))
        MERGE (n)-[:via]->(r)
        
        // pickUp => array of pickUp objects
        // 	{
        //	  uuid => id of town where the persons is picked up by transit,
        //    dropOff => array of dropOff objects
        //  }
        WITH n, x, y, r, towns, $fareMatrix.pickUp as pickUp
        
        // Add Fare Matrix as 
        UNWIND pickUp as p
          MATCH (getOn{uuid:p.uuid})
          MERGE (getOn)-[:getOn{fare:0}]->(v:via)-[:onRoute]->(r)
          WITH v, r, p, towns
          UNWIND p.dropOff as q
            MATCH (getOff{uuid:q.uuid}) 
            MERGE (v)-[:getOff{fare:q.fare}]-(getOff)
        
        
                
        // Define the route the trasportation takes through areas        
        WITH towns, range(0, size(towns)-2) as index
        UNWIND index as i
            MATCH (n) where n.uuid = towns[i] with n, towns, i 
            MATCH (m) where m.uuid = towns[i+1] with n, m
            MERGE (n)-[:Route]->(m) with n, m
            MERGE (n)<-[:Route]-(m)`,
        {
            route: matrix.map((town)=>{return town.uuid}),
            fareMatrix: {pickUp: matrix},
            originFare: 120
        }
    )
}

exports.getRoutesTransaction = function (tx, route) {
    return tx.run(
        `
match (r:transit) with r
match (e)<-[:origin]-(r)
return r.Name as \`Route\`, COLLECT({Name: e.Name, id: e.uuid}) as \`Route Origins\`
            `
    )
}

exports.getShortestPathTransaction = function (tx, townA, townB) {
    return tx.run(
`
//Find the cheapest path between two towns

match (x{uuid:$townA}) with x 
match (y{uuid:$townB}) with x, y

//Getting the shortest path by fare 1.4
call gds.alpha.shortestPath.stream({
	startNode:x,
    endNode:y,
	relationshipWeightProperty: 'fare', 
    nodeQuery: 'Match (n) return id(n) as id',
    relationshipQuery:'MATCH(n)-[r]->(m) RETURN id(n) AS source, id(m) AS target, r.fare AS fare',
    relationshipWeightProperty:'fare'
    })
yield nodeId, cost 
match (n) where id(n) = nodeId with n, nodeId, cost
optional match (n)-[:onRoute]->(m) 
return 
CASE "via" in labels(n)
WHEN true
then m
WHEN false
then n
END as \`Step\`, cost`, {townA, townB}
    )
}