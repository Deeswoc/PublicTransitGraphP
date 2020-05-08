import React, { Component } from 'react'
let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3000';
}
class TownTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            town: []
        };
    }

    async componentDidMount() {
        // Call self-hosted API to get users response
        const res = await fetch(`${DEV_URL}/town/get-towns`);
        console.log(res);
        const town = await res.json();
        debugger
        this.setState({
            town
        });
    }

    render() {
        return (
            <div className="App">
                <table>
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
                </table>
         </div>
        );
    }
}



export default TownTable;