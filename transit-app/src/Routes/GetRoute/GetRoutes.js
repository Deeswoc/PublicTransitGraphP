import React, { useEffect, useState } from 'react';
import '../../Styles/Forms/baseStyle.css'
import '../../Styles/Forms/test.scss'
import { getRoutes } from '../../api stuff/utils'
import { Link } from 'react-router-dom';
function GetRoutes(props) {
    const [rows, setRows] = useState([]);


    useEffect(() => {
        const $ = async () => {
            const routes = await getRoutes();
            const fetchedRows = routes.map(route => {
                let via = "";
                console.log('Pathlist', route.pathList);
                if (route.pathList.length > 2) {
                    route.pathList.forEach((town, i, arr) => {
                        via += (i + 1 < arr.length && i > 0) ? town : "";;
                        via += (i + 2 >= arr.length || i === 0) ? "" : ", ";
                    })
                }
                return (
                    <tr>
                        <td>
                            <Link to={`/Get-Routes/${route.uuid}`}>
                                {route.Name}
                            </Link>
                        </td>
                        <td className="text-right">{route.transitMatrix.matrix[0].exit[route.transitMatrix.matrix[0].exit.length - 1].fare}</td>
                        <td className="text-center">{via}</td>
                    </tr>
                )
            });
            setRows(fetchedRows);
        }

        $();
    }, [])
    return (
        <div>
            <table className="table mt-4 m-shadow-3 route-table">
                <tr>
                    <th>Route</th>
                    <th>Fare</th>
                    <th className="text-center">Via</th>
                </tr>
                {rows}
            </table>
        </div>
    )
}



export default GetRoutes