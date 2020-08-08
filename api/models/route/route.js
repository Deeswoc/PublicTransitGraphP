'use strict'

exports.addRoute = function (validateTowns, driver, ta){
    return async (route) => {
        await validateTowns(route.path);
        
        let session = driver.session();
        let data = await session.writeTransaction(tx => ta.addRouteTransaction(tx, route));
        session.close();
        return data;
    }
}

exports.validateTowns = function(getTown, NotFound){
    return async (towns) => {
        let error = new NotFound();
        for(let i = 0; i < towns.length; i++){
            town = await getTown(towns[i]);
            if(town===null)
                error.missing.push(towns[i]);    
        }
        if(error.missing.length>0){
            error.message = "No town found for some IDs provided on path";
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
