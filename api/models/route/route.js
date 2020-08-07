exports.addRoute = function (validateTowns, driver, ta){
    return async (route) => {
        await validateTowns(route.a, route.b);
        
        let session = driver.session();
        let data = await session.writeTransaction(tx => ta.addRouteTransaction(tx, route));
        session.close();
        return data;
    }
}

exports.validateTowns = function(getTown){
    return async (a, b) => {
        a_exists = await getTown(a);
        b_exists = await getTown(b);
        
        if(!a_exists&&!b_exists){
            a.missing = true;
            b.missing = true;
            throw new NotFound();
        }
        if(!a_exists){
            a.missing = true;
            throw new NotFound();
        }
        if(!b_exists){
            b.missing = true;
            throw new NotFound();
        }
    }
}



class NotFound extends Error{
    constructor(missing){
        super();
        this.missing = missing;
    }
}

exports.NotFound = NotFound;
