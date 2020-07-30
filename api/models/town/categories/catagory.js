const
    driver = require('../../../config/database');
    ta = require('./categoryTransactions')

exports.getTownCategories = async function (){
    session = driver.session();
    const data = await session.readTransaction(tx => ta.getTownCategoriesTransaction(tx));
    let categories = [];
    records = data.records
    records.forEach((cat)=>{
        categories.push(cat._fields[0].properties.Name);
    })
    return categories;
}