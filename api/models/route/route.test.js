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
    let validateTowns = routeModel.validateTowns(getTown, routeModel.NotFound);

    expect(await validateTowns([1, 3, 4])).toBe(true);

    try{
        await validateTowns([4, 8, 129]);
    }catch(error){
        expect(error).toBeInstanceOf(routeModel.NotFound);
        expect(error.missing).toEqual([8, 129]);
    }

    try{
        await validateTowns([23, 1]);
    }catch(error){
        expect(error).toBeInstanceOf(routeModel.NotFound);
        expect(error.missing).toEqual([23]);
        expect(error.missing.length).toBeGreaterThan(0);
    }

    try{
        await validateTowns([23, 100]);
    }catch(error){
        expect(error).toBeInstanceOf(routeModel.NotFound);
        expect(error.missing).toEqual([23, 100]);
        expect(error.missing.length).toBe(1);
    }

    try{
        await validateTowns([23, 100]);
    }catch(error){
        expect(error).toBeInstanceOf(routeModel.NotFound);
        expect(error.missing).toEqual([23, 100]);
        expect(error.missing.length).toBe(1);
    }

    expect(await validateTowns([2, 1])).toBe(true);
    expect(await validateTowns([2, 1, 3])).toBe(true);
    expect(await validateTowns([2, 1, 5, 6])).toBe(true);
    expect(await validateTowns([2, 1, 3, 4, 5, 6])).toBe(true);
    

    expect(validateTowns([314, 312, 332])).rejects.toEqual(new Error('Test'))


})

test('Must throw a not found error', async ()=>{
    let error;
    const mockIDs = [1, 2, 3, 4, 5, 6];
    let getTown = async (ID)=>{
        if(mockIDs.includes(ID))
            return {ID};
        return null
    }
    let errorMessage = "Some IDs provided on path were not found in the database";
    let validateTowns = routeModel.validateTowns(getTown, routeModel.NotFound, errorMessage);

    expect(await validateTowns([1, 3, 4])).toBe(true);

    try{
        await validateTowns([23, 100, 12314]);
    }catch(e){
        error = e;
    }

    expect(error.missing.length).toBeGreaterThan(0);
    expect(error).toBeInstanceOf(routeModel.NotFound);
    expect(error.message).toEqual(errorMessage);


})


