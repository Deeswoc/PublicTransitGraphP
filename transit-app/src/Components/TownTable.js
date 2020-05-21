import React from 'react';
import PropT from 'prop-types';

export default function TownTable (props) {
    console.log(props.townList)
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Parish</th>
                    <th>Categories</th>
                </tr>
                {props.townList.map((town) =>(
                    <tr>
                        <td>{town.name}</td>
                        <td>{town.parish}</td>
                        <td>{town.categories.map((category, index, arr)=>(`${category}${index + 1 !== arr.length ? ', ' : ''}`))}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

TownTable.propTypes = {
    townList: PropT.arrayOf(PropT.shape({
        name: PropT.string,
        parish: PropT.string,
        categories: PropT.arrayOf(PropT.string)
    })).isRequired
}