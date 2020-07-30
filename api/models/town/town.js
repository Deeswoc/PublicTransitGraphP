const
    driver = require('../../config/database'),
    ta = require('./townTransactions');
async function getTown(townID){
    session = driver.session();
    const data = await session.readTransaction(tx => ta.getTownTransaction(tx, townID));
    return data;
}

function addTown(res, townName) {
    session = driver.session();
    failed = false;
    const promise  = session.writeTransaction(tx => ta.addTownTransaction(tx, townName));
    promise.then(data=>{
        res.status(201).send({
            success: true,
            message: 'Town Added Successfully',
            error: null,
            data: data
        });
        session.close();
        // driver.close();
        
    }).catch((err) =>{
        session.close();
        // driver.close();
        res.status(500).send({
            success: false,
            message: err.message,
            error: err
        })
    }
    )
    return promise;
}

function addTowns(towns){
    session = driver.session();
    const promise = session.writeTransaction(tx => ta.addTownsTransaction(tx, towns));
    promise.catch(err=>{
        console.log(err.message);
    }).finally(data=>{
        session.close();
    });
    return promise;
}

exports.getTown = async function (townID){
    try {
        let session = driver.session();
        let data = await session.readTransaction(tx => ta.getTownTransaction(tx, townID));
        let town = data.records[0]._fields[0].properties;
        session.close();
        return town;
    } catch (error) {
        console.log(error.message);
        session.close();
    }
}

exports.getTowns = async function(){
    try {
        let session = driver.session();
        data = await session.readTransaction(tx => ta.getTownsTransaction(tx));
        let townArr = [];
        data.records.forEach(element => {
            townArr.push({
                name: element._fields[0].properties.Name,
                parish: element._fields[0].properties.parish
            })
        });
        return townArr;
    } catch (error) {
        console.log(error.message);
    }
}