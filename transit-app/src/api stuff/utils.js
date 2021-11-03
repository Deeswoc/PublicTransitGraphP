import d from '../devURL';

async function addTown(towns) {

    return fetch(`${d}/towns`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(towns)
    });

}

async function addRoute(route) {
    fetch(`${d}/routes`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ route })
    })
        .then(response => {
            if (response.status === 201) {
                alert('Added the route');
            }
            console.log(response.status);
        })
}

async function getRoute(id) {
    let res = await fetch(`${d}/routes/${id}`);
    let route;
    if (res.ok)
        route = await res.json();
    return { route, statusCode: res.status };
}

async function getRoutes() {
    const res = await fetch(`${d}/routes`);
    const routes = await res.json();
    console.log("Response: ", routes);
    return routes;
}

async function getTown(id) {
    const res = await fetch(`${d}/towns/${id}`);
    const town = await res.json();
    return town;
}

async function getTowns() {
    const res = await fetch(`${d}/towns`);
    const towns = await res.json();
    return towns;
}

export {
    addTown,
    getTown,
    getTowns,
    addRoute,
    getRoute,
    getRoutes,
}