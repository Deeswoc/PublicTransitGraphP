let 
    townModel = require('./town'),
    { driver } = require('../../test_resources/database');
test('Find town from id', async () => {
    const mockTowns = [
        {
            Name: "St. Ann's Bay"
        },
        {
            Name: "Beachamville"
        },
        {
            Name: "Higgin Town"
        }
    ]
    let ta = { getTownTransaction: (tx, ID) => {
        return new Promise((resolve, reject)=>{
            let data = {
                records: [
                    {
                        _fields: [
                            
                        ]
                    }
                ]
            }
            data.records[0]._fields[0] = {properties: mockTowns[ID]};
            resolve(data);
        })  
    }}


    let getTown = townModel.getTown(driver, ta);
    
    expect(await getTown(3)).toEqual(mockTowns[5]);
})