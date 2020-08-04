const
    driver = require('../../../config/database'),
    ta = require('./categoryTransactions'),
    { v4: uuid } = require('uuid');

exports.getTownCategories = async function (){
    let session = driver.session();
    const data = await session.readTransaction(tx => ta.getTownCategoriesTransaction(tx));
    let categories = [];
    records = data.records
    records.forEach((cat)=>{
        categories.push(cat._fields[0].properties.Name);
    })
    session.close();
    return categories;
}

exports.addTownCategories = async function (categories){
    let session = driver.session();
    categories = categories.map((category)=>{ 
        return {...category, id: uuid()}
    })
    const data = await session.writeTransaction(tx => ta.createTownCategoriesTransaction(tx, categories));
    session.close();
}