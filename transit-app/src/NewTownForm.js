import React, { Component } from 'react'
import PropT from 'prop-types';
import d from './devURL'

class NewTownForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            town: '',
            parish: '',
        }
        this.updateTown = this.updateTown.bind(this);
    } 

    updateTown = (e) =>{
        this.setState({town: e.target.value});
        console.log(this.state.town);
    }
    updateParish = (e) =>{
        this.setState({parish: e.target.value});
        console.log(this.state.parish);
    }
    render(){
        return(
            <div>
                <form onSubmit={this.submit}>
                    <label htmlFor="Town">Town: </label>
                    <input id="Town" type="Text" onChange={this.updateTown}/>
                    <label htmlFor="Parish">Parish: </label>
                    <input id="Parish" type="Text" onChange={this.updateParish}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }


    submit = async e => {
        e.preventDefault();
        try{
            let towns = [];
            towns.push({name: this.state.town, parish: this.state.parish});
            let res = await fetch(`${d}/town/add-towns`, {
                method: 'POST',

                headers: {
                    'Content-Type':'application/json', 
                },
                body: JSON.stringify({towns})
            });
            let data = await res.json();
            alert(`Status ${res.status}`);
            if(res.status > 200 && res.status < 300){
                alert("Added Successfully");
            }else{
                alert(`${data}`);
            } 
        }catch(error){
            console.log(error);
            alert(error);
        }
    }
}
NewTownForm.propTypes = {
    town: PropT.string,
    parish: PropT.string
}
export default NewTownForm;