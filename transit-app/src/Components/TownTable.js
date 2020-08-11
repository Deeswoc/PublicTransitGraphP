import React from 'react';
import PropT from 'prop-types';

export default function TownTable (props) {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Parish</th>
                    <th>Categories</th>
                </tr>
                {props.townList.map((town, i) =>(
                    <tr key={town.id||i}>
                        <td>{town.name}</td>
                        <td>{town.parish}</td>
                        <td>{town.categories.map((category, index, arr)=>(`${category.name}${index + 1 !== arr.length ? ', ' : ''}`))}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

TownTable.propTypes = {
    townList: PropT.arrayOf(PropT.shape({
        id: PropT.string,
        name: PropT.string,
        parish: PropT.string,
        categories: PropT.arrayOf(PropT.shape({
            id: PropT.string,
            description: PropT.string,
            name: PropT.string,
        }))
    })).isRequired
}