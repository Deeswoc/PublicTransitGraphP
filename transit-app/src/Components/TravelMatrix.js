import React from 'react'
import '../Styles/Forms/test.scss'
function TravelMatrix(props) {

    let { route, matrix } = props;
    return (
        <table className="table table-bordered mt-5">
            <tr>
                <th className="text-center">To / <br/>From</th>
                {route ?
                    route.map((town) => {
                        return <th className="font-weight-bold">{town.Name}</th>
                    }) : <th>Not Route</th>}
            </tr>
            {matrix ? matrix.map((pickup, i, arr) => {
                let orderdPickup = arr.filter((pickupTown) => { return pickupTown.uuid === route[i].uuid })[0];
                return (
                    <tr>
                        <th>{route[i].Name}</th>
                        {orderdPickup.exit.map((exit, i, arr) => {
                            let orderedExit = arr.filter((unorderedExit) => {
                                return (unorderedExit.id === route[i].uuid);
                            })[0]
                            return (
                                <td className={`${orderedExit.id === orderdPickup.uuid ? "invalid" : ""}`}>{orderedExit.fare}</td>
                            )
                        })}
                    </tr>
                )
            }) : <tr>
                <td>Didn't load</td>
            </tr>}
        </table>
    )
}

export default TravelMatrix