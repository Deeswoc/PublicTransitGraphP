exports.getTownCategoriesTransaction = function (tx){
    return tx.run(
        `MATCH (category:LocationCategory)
        RETURN category
        ORDER BY category.Name
        `
    )
}

exports.createTownCategoriesTransaction = function (tx, categories){
    return tx.run(
        `
        UNWIND $categories as category
            CREATE (:LocationCategory{Name:category.name, description: category.description, uuid: category.id })
        `, {categories}
    )
}