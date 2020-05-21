import React, { Component, useEffect, useContext } from 'react'
import PropT from 'prop-types';
import MultiSelWindow from './Components/MultiSelectWindow'
import { NewTownFormContext } from './Contexts/NewTownFormContext';
import { actions } from './Contexts/NewTownFormContextReducers/newTownFormContextReducer';
import TownTable from './Components/TownTable';


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
                townsToSubmit,
                parish,
                name,
                category,
                submit,
                dispatch,
            } = context;
            return(
                <form ref={(form)=>this.form = form} onSubmit={submit}>
                    <label htmlFor="Name">Name: </label>
                    <input id="Name" type="Text" value={name} onChange={
                        e => {
                            dispatch({type: actions.STATE, $: {name: e.target.value}});
                        }
                    } required/>
                    <label htmlFor="Parish">Parish: </label>
                    <input id="Parish" type="Text" value = {parish}onChange={
                        e => {
                            dispatch({type: actions.STATE, $: {parish: e.target.value}});
                        }
                    } required/>
                    <LocCat></LocCat>
                    <MultiSelWindow/>
                    <button type="button" onClick={
                        (e)=>{
                            dispatch({type:actions.ADD_CATEGORY, $: {category}
                        })}}>Add Cat</button>
                    <button type="button" onClick={
                        (e) => {
                            dispatch({type:actions.ADD_TOWN_SUBMITION});
                            dispatch({type:actions.RESET_FORM});
                        }
                    }>Add Town</button>
                    <button type="submit" onClick={submit}>Submit</button>
                    <TownTable townList = {townsToSubmit}/>

                </form>
            )
        }}</NewTownFormContext.Consumer>
        );
    }
}



function LocCat(props){
    
    const { catList, dispatch } = useContext(NewTownFormContext);
    const onChange = (e) => {
        dispatch({type:actions.STATE, $: {category: e.target.value}});
    }

    useEffect(()=>{
        dispatch({type:actions.STATE, $: {category: catList[0]}});
    },[catList, dispatch]);
    return(
        <select defaultValue={catList[0]} style={{minWidth: 110}} onChange={onChange}>
            {catList.sort().map(category => (<option value={category}>{category}</option>))}
        </select>
    )
}



NewTownForm.propTypes = {
    town: PropT.string,
    parish: PropT.string
}


export default NewTownForm;