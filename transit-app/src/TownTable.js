import React, { Component } from 'react'
import d from './devURL';


class TownTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            town: []
        };
    }

    async componentDidMount() {
        // Call self-hosted API to get users response
        const res = await fetch(`${d}/town/get-towns`);
        console.log(res);
        const town = await res.json();
        this.setState({
            town
        });
    }

    render() {
        return (
            <div className="App">
                <table>
                    <tbody>
                        <tr>
                            <th>Town</th>
                            <th>Parish</th>
                        </tr>
                        {
                        this.state.town.map(town => ( <tr>
                            <td>{town.name}</td>
                            <td>{town.parish}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
         </div>
        );
    }
}



export default TownTable;