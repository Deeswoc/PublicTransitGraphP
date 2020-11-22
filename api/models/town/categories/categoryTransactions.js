exports.getTownCategoriesTransaction = function (tx){
    return tx.run(
        `MATCH (category:LocationCategory)
        RETURN category 
        `
    )
}

exports.createTownCategoriesTransaction = function (tx, categories){
    return tx.run(
        `
        UNWIND $categories as category
            CREATE (c:LocationCategory{Name:category.name, description: category.description, uuid: category.id })
        RETURN c;
        `, {categories}
    )
}