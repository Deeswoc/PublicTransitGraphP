const routeModel = require('./route');


test('create a route in the database', async () => {

    let data = {
        message: "hi"
    }
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