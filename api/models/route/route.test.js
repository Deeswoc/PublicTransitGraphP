const routeModel = require('./route');


test('create a route in the database', async () => {

    let validateTowns = ()=>{
        return true
    }

    let driver = {session: ()=>{
        return {
            writeTransaction: async (runTransaction, route)=>{
                return runTransaction();
            },
            close: ()=>{

            }
        }}
    }

    let ta =  { addRouteTransaction: (tx, route)=>{
        return new Promise((resolve, reject)=>{
            resolve(route);
        })
    }}
    let addRoute = routeModel.addRoute(validateTowns, driver, ta);

    let newRoute = {
        a: "endpoint",
        b: "endpoint",
    }
    expect(await addRoute(newRoute)).toEqual(newRoute);
})

test('State if any element is missing from the passed elements', async () => {

    const mockIDs = [1, 2, 3, 4, 5, 6];
    let getTown = async (ID)=>{
        if(mockIDs.includes(ID))
            return {ID};
    }
    validateTowns = routeModel.validateTowns(getTown, routeModel.NotFound);

    expect(await validateTowns(1, 3)).toBe(true);

    try{
        await validateTowns(4, 8);
    }catch(error){
        expect(error).toBeInstanceOf(routeModel.NotFound);
        expect(error.missing).toEqual([8]);
    }

    try{
        await validateTowns(23, 1);
    }catch(error){
        expect(error).toBeInstanceOf(routeModel.NotFound);
        expect(error.missing).toEqual([23]);
    }

    try{
        await validateTowns(23, 100);
    }catch(error){
        expect(error).toBeInstanceOf(routeModel.NotFound);
        expect(error.missing).toEqual([23, 100]);
    }
})
