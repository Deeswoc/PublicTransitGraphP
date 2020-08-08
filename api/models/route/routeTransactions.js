exports.addRouteTransaction = function(tx, route){
    return tx.run(
`
//Create Route

// Define Route
with $route as towns
// Find Origin Nodes
MATCH (x) WHERE id(x) = towns[0] WITH x, towns
MATCH (y) WHERE id(y) = last(towns) WITH x, y, towns

// Create Route/Transit Node
MERGE (x)-[:origin{fare:0}]->(r:transit{Name:x.Name + " to " + y.Name})-[:origin{fare:$origin_fare}]->(y) with x, r, y, towns
MERGE (x)<-[:origin{fare:$origin_fare}]-(r)<-[:origin{fare:0}]-(y) with x, y, r, towns

// Towns Transit Travels Via
MATCH (n) where id(n) in $via
	MERGE (n)-[:via{fare:$via_fare}]->(r)
    MERGE (n)<-[:via{fare:$via_fare}]-(r)
        
// Define the route the trasportation takes through areas        
WITH x, y, towns, range(0, size(towns)-2) as index
UNWIND index as i
	MATCH (n) where id(n) = towns[i] with n, towns, i 
    MATCH (m) where id(m) = towns[i+1] with n, m
    MERGE (n)-[:Route]->(m) with n, m
    MERGE (n)<-[:Route]-(m)`,
    {
        route: route.path,
        via_fare: route.fare.via,
        origin_fare: route.fare.origin,
        via: route.path.filter((passes, i, arr) => {
            if(i!=0 && i!= arr.length - 1)
                return passes;
        })
    }    
    )
}