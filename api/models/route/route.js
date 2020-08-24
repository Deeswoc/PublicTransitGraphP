'use strict'

exports.addRoute = function (validateTowns, driver, ta) {
    return async (route) => {
        await validateTowns(route.path);

        let session = driver.session();
        let data = await session.writeTransaction(tx => ta.addRouteTransaction(tx, route));
        session.close();
        return data;
    }
}

exports.getRoutes = function (driver, ta) {
    return async () => {
        let session = driver.session();
        let routes = [];
        let data = await session.readTransaction(tx => ta.getRoutesTransaction(tx));
        let records = data.records;
        records.forEach((route) => {
            routes.push({
                name: route.get(0),
                origins: route.get(1)
            })
        })
        session.close();
        return routes;
    }
}

exports.getShortestPath = function (validateTowns, driver, ta) {

    return async (townA, townB) => {
        await validateTowns([townA, townB]);

        let session = driver.session();
        let data = await session.readTransaction(tx => ta.getShortestPathTransaction(tx, townA, townB));
        session.close();
        return data;
    }

}

exports.validateTowns = function (getTown, NotFound, errorMessage) {
    return async (towns) => {
        let error = new NotFound(errorMessage);
        for (let i = 0; i < towns.length; i++) {
            let town = await getTown(towns[i]);
            if (town === null)
                error.missing.push(towns[i]);
        }
        if (error.missing.length > 0) {
            throw error;
        }
        return true;
    }
}



class NotFound extends Error {
    constructor(errorMessage) {
        super();
        this.message = errorMessage;
        this.missing = [];
    }
}

exports.NotFound = NotFound;
