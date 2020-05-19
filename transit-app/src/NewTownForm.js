import React, { Component, useEffect, useContext } from 'react'
import PropT from 'prop-types';
import MultiSelWindow from './Components/MultiSelectWindow'
import { NewTownFormContext } from './Contexts/NewTownFormContext';


class NewTownForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            town: '',
            parish: '',
            category: ''
        }
        
    } 
    form;
    render(){
        return(
        <NewTownFormContext.Consumer>{(context) => {
            const {
                addTownToSubmit,
                category,
                addCategory,
                updateTown,
                updateParish,
                submit,
            } = context;
            return(
                <form ref={(form)=>this.form = form} onSubmit={submit}>
                    <label htmlFor="Town">Town: </label>
                    <input id="Town" type="Text" onChange={updateTown} required/>
                    <label htmlFor="Parish">Parish: </label>
                    <input id="Parish" type="Text" onChange={updateParish} required/>
                    <LocCat></LocCat>
                    <MultiSelWindow/>
                    <button type="button" onClick={(e)=>{addCategory(category); let valid =  this.form.checkValidity();}}>Add Cat</button>
                    <button type="button" onClick={addTownToSubmit}>Add Town</button>
                    <button type="submit" onClick={submit}>Submit</button>

                </form>
            )

        }}</NewTownFormContext.Consumer>
        );
    }
}



function LocCat(props){
    
    const { catList, setCategory } = useContext(NewTownFormContext);
    const onChange = (e) => {
        setCategory(e.target.value);
    }

    useEffect(()=>{
        setCategory(catList[0]);
    },[catList]);
    return(
        <select defaultValue={catList[0]} style={{minWidth: 110}} onChange={onChange}>
            {catList.map(category => (<option value={category}>{category}</option>))}
        </select>
    )
}

NewTownForm.propTypes = {
    town: PropT.string,
    parish: PropT.string
}
export default NewTownForm;