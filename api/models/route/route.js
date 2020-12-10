let driver;
let ta;
let uuid;
let validateTowns;
let NotFound;

async function addRoute(route) {
  await validateTowns(route.transitMatrix.map((town) => town.uuid));
  const IDedRoute = {
    ...route,
    uuid: uuid(),
  };
  const session = driver.session();
  const data = await session.writeTransaction((tx) => ta.addRouteTransaction(tx, IDedRoute));
  session.close();
  return data;
}

async function getRoutes() {
  const session = driver.session();
  const routes = [];
  const data = await session.readTransaction((tx) => ta.getRoutesTransaction(tx));
  const { records } = data;
  records.forEach((route) => {
    routes.push({
      name: route.get(0),
      origins: route.get(1),
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
    getRoutes,
    addRoute,
  };
};
