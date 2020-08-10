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
        try {
            session = driver.session();
            towns = towns.map(town => {
                return {
                    ...town,
                    uuid: createID()
                } 
            })
            const data = await session.writeTransaction(tx => ta.addTownsTransaction(tx, towns));
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }finally{
            session.close();
        }
    }
    
}



exports.addTown = async function (res, townName) {

    try {
        session = driver.session();
        const data  = await session.writeTransaction(tx => addTownTransaction(tx, townName));
    } catch (error) {
        
    }

    promise.then(data=>{
        res.status(201).send({
            success: true,
            message: 'Town Added Successfully',
            error: null,
            data: data
        });
        session.close();
        
    }).catch((err) =>{
        session.close();
        res.status(500).send({
            success: false,
            message: err.message,
            error: err
        })
    }
    )
    return promise;
}