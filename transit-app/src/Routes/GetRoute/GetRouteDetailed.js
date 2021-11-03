import React, { useEffect, useRef, useState } from 'react';
import { getRoute } from '../../api stuff/utils'
import { useParams } from 'react-router'
import TravelMatrix from '../../Components/TravelMatrix';

function GetRouteDetailed(props) {
    let { id } = useParams();
    let [route, setRoute] = useState({ transitMatrix: { matrix: [] } });
    let [status, setStatus] = useState(0);

    useEffect(() => {
        const $ = async () => {
            let { route: fetchedRoute, statusCode } = await getRoute(id);
            setRoute(fetchedRoute);
            setStatus(statusCode);
            console.log(statusCode)
        }

        $();
    }, [id])

    return (
        <RouteDetail route={route} status={status}/>
    )
}

function RouteDetail(props) {
    const { route, status } = props;

    if (props.status  === 404)
        return (
            <h1 className="font-weight-bold mt-3">
                404: Route Not Found
            </h1>
        )
    else if (status !== 0 && route)
        return (
            <div>
                <h1 className="font-weight-bold mt-3">{route.Name}</h1>
                <TravelMatrix route={route.pathList} matrix={route.transitMatrix.matrix} />
            </div>
        )
    else return (
        <div>

        </div>
    )
}

export default GetRouteDetailed