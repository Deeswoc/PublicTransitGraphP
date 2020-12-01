function getTownCategoriesTransaction(tx) {
  return tx.run(
    `MATCH (category:LocationCategory)
      RETURN category 
      `,
  );
}

function createTownCategoriesTransaction(tx, categories) {
  return tx.run(
    `
      UNWIND $categories as category
          CREATE (c:LocationCategory{Name:category.name, description: category.description, uuid: category.id })
      RETURN c;
      `, { categories },
  );
}

module.exports = {
  getTownCategoriesTransaction,
  createTownCategoriesTransaction,
};
