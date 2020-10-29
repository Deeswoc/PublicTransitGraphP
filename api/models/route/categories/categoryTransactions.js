exports.addRouteCategory = function (tx, category){
    return tx.run(
        `
            CREATE (category:RouteCategory{Name:$name, uuid:$uuid, description:$description})
            return category
        `
        , {
            name: category.name,
            uuid: category.uuid,
            description: category.description
        }
    )
}

exports.getRouteCategories = function (tx, uuid){
    return tx.run(
        `
            MATCH (category:RouteCategory)
            RETURN category
        `, {
            uuid
        }
    )
}

exports.getRouteCategory = function (tx, uuid){
    return tx.run(
        `
            MATCH (category:RouteCategory{uuid:$uuid})
            RETURN category
        `, {
            uuid
        }
    )
}