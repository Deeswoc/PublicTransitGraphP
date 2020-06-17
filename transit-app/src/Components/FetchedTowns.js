import React, { Component } from 'react'
import d from '../devURL';
import TownTable from './TownTable';


class FetchedTowns extends Component{
    constructor(props) {
        super(props);
        this.state = {
            towns: []
        };
    }

    async componentDidMount() {
        const res = await fetch(`${d}/towns`);
        console.log(res);
        const towns = await res.json();
        this.setState({
            towns
        });
    }

    render() {
        return (
         <div>
            <TownTable townList={this.state.towns.map(town=>({...town, categories:['']}))}/>
         </div>
        );
    }
}



export default FetchedTowns;