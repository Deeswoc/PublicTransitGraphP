const
    ta = require('./townTransactions');

exports.getTown = function(driver, ta){
    return async function (townID){
        
        let session = driver.session();
        try {
            let data = await session.readTransaction(tx => ta.getTownTransaction(tx, townID));
            if(data.records.length == 0)
                return null;
            let town = data.records[0]._fields[0].properties;
            session.close();
            return town;
        } catch (error) {
            console.log(error.message);
            session.close();
        }
    }
}


exports.getTowns = function(driver, ta){
    return async function(){
        try {
            let session = driver.session();
            data = await session.readTransaction(tx => ta.getTownsTransaction(tx));
            let townArr = [];
            data.records.forEach(element => {
                townArr.push({
                    name: element.get('area').properties.Name,
                    id:element.get('area').properties.uuid,
                    parish: element.get('parish')
                })
            });
            return townArr;
        } catch (error) {
            console.log(error.message);
        }
    }
}

exports.addTowns = function(driver, ta, createID){
    return async function (towns){
        let session;
        let newTowns = [];
        try {
            session = driver.session();
            towns = towns.map(town => {
                return {
                    ...town,
                    uuid: createID()
                } 
            })
            const data = await session.writeTransaction(tx => ta.addTownsTransaction(tx, towns));            
            data.records.forEach((record)=>{
                newTowns.push(record.get('n').properties);
            });
            return newTowns;
        } catch (error) {
            console.log(error.message);
        }finally{
            session.close();
        }
    }
    
}