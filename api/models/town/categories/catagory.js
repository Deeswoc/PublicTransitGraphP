let uuid;
let driver;
let ta;

async function getTownCategories() {
  const session = driver.session();
  const categories = [];
  const data = await session.readTransaction((tx) => ta.getTownCategoriesTransaction(tx));
  const { records } = data;
  records.forEach((category) => {
    categories.push({
      id: category.get(0).properties.uuid,
      name: category.get(0).properties.Name,
      description: category.get(0).properties.description,
    });
  });
  session.close();
  return categories;
}

async function addTownCategories(categories) {
  const session = driver.session();
  const IDedCategories = categories.map((category) => ({ ...category, id: uuid() }));
  const newCatagories = [];
  const data = await session
    .writeTransaction((tx) => ta.createTownCategoriesTransaction(tx, IDedCategories));
  data.records.forEach((record) => {
    newCatagories.push(record.get('c').properties);
  });
  session.close();
  return newCatagories;
}

module.exports = (dependencies) => {
  uuid = dependencies.uuid;
  driver = dependencies.driver;
  ta = dependencies.ta;

  return {
    getTownCategories,
    addTownCategories,
  };
};
