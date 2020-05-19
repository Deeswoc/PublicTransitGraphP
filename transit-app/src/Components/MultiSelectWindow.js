import React, { Component, useContext } from 'react'
import { NewTownFormContext } from '../Contexts/NewTownFormContext'

function MultiSelWindow(props){
    const { categories, removeCategory } = useContext(NewTownFormContext)
    return (
        <div>
            <ul>   
                {categories.map((category) =>  (
                    <SelectedItem value={category} />
                ))}
            </ul>
        </div>
    )
}

function SelectedItem(props){
    const { removeCategory } = useContext(NewTownFormContext);

    return (
        <li onClick={
            (e) => {
                removeCategory(props.value)
                debugger
            }
        }>{props.value}</li>    
    )
}

export default MultiSelWindow;