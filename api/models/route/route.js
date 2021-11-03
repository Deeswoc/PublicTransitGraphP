let driver;
let ta;
let uuid;
let validateTowns;
let NotFound;

async function addRoute(route) {
  await  validateTowns(route.transitMatrix.pickup.map((town) => town.uuid));
  const IDedRoute = {
    ...route,
    uuid: uuid(),
  };
  const session = driver.session();
  const data = await session.writeTransaction((tx) => ta.addRouteTransaction(tx, IDedRoute));
  session.close();
  return data;
}

async function getRoute(id) {
  const session = driver.session();
  const {records} = await session.readTransaction((tx) => ta.getRouteTransaction(tx, id));
  if(records.length === 0) 
    return null;
  const route = {
    ...records[0].get('Route'),
    transitMatrix: records[0].get('Travel Matrix'),
  }
  session.close();
  return route
}

async function getRoutes() {
  const session = driver.session();
  const routes = [];
  const data = await session.readTransaction((tx) => ta.getRoutesTransaction(tx));
  const { records } = data;
  records.forEach((route) => {
     routes.push({
      ...route.get('Route'),
      transitMatrix: route.get('Travel Matrix'),
    });
  });
  session.close();
  return routes;
}

async function getShortestPath(townA, townB) {
  const towns = [];
  towns.push(townA, townB);
  await validateTowns(towns);

  const session = driver.session();
  const data = await session
    .readTransaction((tx) => ta.getShortestPathTransaction(tx, townA, townB));
  session.close();
  return data;
}

module.exports = (dependencies) => {
  driver = dependencies.driver;
  ta = dependencies.ta;
  uuid = dependencies.uuid;
  validateTowns = dependencies.validateTowns;
  return {
    NotFound,
    validateTowns,
    getShortestPath,
    getRoute,
    getRoutes,
    addRoute,
  };
};
