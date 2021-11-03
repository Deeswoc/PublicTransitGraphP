import React, { Component } from 'react'
import TownTable from './TownTable';
import {getTowns} from '../api stuff/utils'

class FetchedTowns extends Component{
    constructor(props) {
        super(props);
        this.state = {
            towns: []
        };
    }

    async componentDidMount() {
        const towns = await getTowns();
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