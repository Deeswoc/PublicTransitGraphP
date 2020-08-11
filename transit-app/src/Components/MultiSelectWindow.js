import React, { useContext } from 'react'
import { NewTownFormContext } from '../Contexts/NewTownFormContext'
import { actions } from '../Contexts/NewTownFormContextReducers/newTownFormContextReducer';

function MultiSelWindow(props){
    const { categories } = useContext(NewTownFormContext)
    return (
        <div>
            <ul>   
                {categories.map((category, i) =>  (
                    <SelectedItem key={category.id} value={category} />
                ))}
            </ul>
        </div>
    )
}

function SelectedItem(props){
    const { dispatch } = useContext(NewTownFormContext);

    return (
        <li onClick={
            (e) => {
                dispatch({type: actions.REMOVE_CATEGORY, cat: props.value.id});
            }
        }>{props.value.name}</li>    
    )
}

export default MultiSelWindow;