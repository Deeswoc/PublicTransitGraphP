exports.addRouteTransaction = function (tx, route) {
    return tx.run(
        `
//Create Route

// Define Route
with $route as towns
// Find Origin Nodes
MATCH (x:area{uuid:towns[0]}) WITH x, towns
MATCH (y:area{uuid:last(towns)}) WITH x, y, towns

// Create Route/Transit Node
MERGE (x)-[:origin{fare:0}]->(r:transit{Name:x.Name + " to " + y.Name})-[:origin{fare:$originFare}]->(y) with x, r, y, towns
MERGE (x)<-[:origin{fare:$originFare}]-(r)<-[:origin{fare:0}]-(y) with x, y, r, towns

// Towns passed through
MATCH (n:area) where n.uuid in $via
    MERGE (n)-[:via{fare:$viaFare}]->(r)
    MERGE (n)<-[:via{fare:$viaFare}]-(r)
    with n, x, y, towns 


// Allows for cost to be calculated when boarding from a pass-through area
CREATE (v:via) with n, x, y, towns, v
MERGE (n)-[:takeFrom{fare:0}]->(v) with n, x, y, towns, v
UNWIND towns as townID
MATCH (t{uuid:townID}) where not exists ((t)<-[:takeFrom]-(v))
MERGE (v)-[:exitsAt{fare:$viaFare}]->(t)
    
        
// Define the route the trasportation takes through areas        
WITH towns, range(0, size(towns)-2) as index
UNWIND index as i

    MATCH (n) where n.uuid = towns[i] with n, towns, i 
    MATCH (m) where m.uuid = towns[i+1] with n, m
    MERGE (n)-[:Route]->(m) with n, m
    MERGE (n)<-[:Route]-(m)`,
        {
            route: route.path,
            viaFare: route.fare.via,
            originFare: route.fare.origin,
            via: route.path.filter((passes, i, arr) => {
                if (i != 0 && i != arr.length - 1)
                    return passes;
            })
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

// Here I create a config that will be used to run the shortest
// path algorithm. Set it as "config" for readability
{
  
  startNode: x,
  endNode: y,
  // Get the nodes that will be used in the algorithm
  nodeQuery: "match (n) return id(n) as id", 
  // Get all the relationships that will be used in the algorithm
  // Since the rgraph is being weighed using the fare it must be returned 
  // from the relationship query
  relationshipQuery:
  	'MATCH (n)-[r:via|origin]->(m) return id(n) as source, id(m) as target, r.fare as cost',
  // here is where you set the weighted property returned from the relationship query
  relationshipWeightProperty: 'cost'
} as config

// Calling the shortestPath algorithm and streamed the results while
// passing in the previously defined configuration
CALL gds.alpha.shortestPath.stream(config)

// Algorithm returns the ID of the nodes on the
// shortest path and cost from the function
YIELD nodeId, cost

// Returns the node and commilative cost of the route
RETURN gds.util.asNode(nodeId) AS node, cost
`, {townA, townB}
    )
}