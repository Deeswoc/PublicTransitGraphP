exports.getTownCategoriesTransaction = function (tx){
    return tx.run(
        `MATCH (category:LocationCategory)
        return category
        ORDER BY category.Name
        `
    )
}