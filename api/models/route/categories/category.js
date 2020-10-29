
exports.getCategories = function (driver, ta){
    return async function (){
        let session = driver.session();
        try{
            let categoryArr = [];
            let data = await session.readTransaction(tx => ta.getRouteCategories(tx));
            data.records.forEach(element => {
                categoryArr.push(element._fields[0].properties)
            });
            session.close();
            return categoryArr;
        } catch (error) {
            console.log(error.message);
        }
    }
}

exports.getCategory = function (driver, ta){
    return async function (uuid){
        let session = driver.session();
        //TODO add try/catch
            let data = await session.readTransaction(tx => ta.getRouteCategory(tx, uuid));
            if(data.records.length == 0)
                return null;
            let category = data.records[0]._fields[0].properties;
            return category;
    }
}

exports.addRouteCategory = function (driver, ta, uuid){
    return async function(category){
        let session = driver.session();
        category.uuid = uuid();
        try {
            let data = await session.writeTransaction(tx => ta.addRouteCategory(tx, category));
        } catch (error) {
            console.log(error.message);
        }finally{
            session.close();
        }
    }
}
