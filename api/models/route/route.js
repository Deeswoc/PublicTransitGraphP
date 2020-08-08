exports.addRoute = function (validateTowns, driver, ta){
    return async (route) => {
        await validateTowns(route.a, route.b);
        
        let session = driver.session();
        let data = await session.writeTransaction(tx => ta.addRouteTransaction(tx, route));
        session.close();
        return data;
    }
}

exports.validateTowns = function(getTown, NotFound){
    return async (a, b) => {
        a_exists = await getTown(a);
        b_exists = await getTown(b);
        let error = new NotFound();

        if(!a_exists)
            error.missing.push(a);
        if(!b_exists)
            error.missing.push(b);
        if(error.missing.length>0){
            error.message = "Some IDs provided on path were not found in the database";
            throw error;
        }
        return true;
    }
}



class NotFound extends Error{
    constructor(){
        super();
        this.missing = [];
    }
}

exports.NotFound = NotFound;
