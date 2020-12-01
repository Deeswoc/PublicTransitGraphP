let uuid = require('uuid').v4;
let driver = require('../../config/database');
let ta = require('./townTransactions');

async function getTown(townID) {
  const session = driver.session();
  try {
    const data = await session.readTransaction((tx) => ta.getTownTransaction(tx, townID));
    if (data.records.length === 0) return null;
    const town = data.records[0].get('n').properties;
    session.close();
    return town;
  } catch (error) {
    console.log(error.message);
    session.close();
    return false;
  }
}

async function getTowns() {
  try {
    const session = driver.session();
    const data = await session.readTransaction((tx) => ta.getTownsTransaction(tx));
    const townArr = [];
    data.records.forEach((element) => {
      townArr.push({
        name: element.get('area').properties.Name,
        id: element.get('area').properties.uuid,
        parish: element.get('parish'),
      });
    });
    return townArr;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

async function addTowns(towns) {
  let session;
  const newTowns = [];
  try {
    session = driver.session();
    const IDedTowns = towns.map((town) => ({
      ...town,
      uuid: uuid(),
    }));
    const data = await session.writeTransaction((tx) => ta.addTownsTransaction(tx, IDedTowns));
    data.records.forEach((record) => {
      newTowns.push(record.get('n').properties);
    });
    return newTowns;
  } catch (error) {
    console.log(error.message);
    return false;
  } finally {
    session.close();
  }
}

module.exports = (dependencies) => {
  driver = dependencies.driver;
  ta = dependencies.ta;
  uuid = dependencies.uuid;
  return {
    getTown,
    getTowns,
    addTowns,
  };
};
