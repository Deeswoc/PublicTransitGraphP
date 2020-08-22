import React, { createContext, useReducer, useEffect } from 'react';
import d from '../devURL';
import newRouteFormContextReducer, { actions as act}from './NewRouteFormContextReducers/NewRouteFormContextReducer.js';
export const NewRouteFormContext = createContext();



function NewRouteFormContextProvider(props){
    const initialState = {
        endPoints: {
            A: {
                name: "",
                parish: ""
            },
            B: {
                name: "",
                parish: ""
            }
        },
        midPoints: [],
        fare: {
            origin: 0,
            via:0
        },
        corperate: false,
        class: "",
        areas: []
    }

    
    const [state, dispatch] = useReducer(newRouteFormContextReducer, initialState);
    
    useEffect(()=>{ 
        let $ = async() => {
            let data = await fetch(`${d}/towns/`);
            let areas = await data.json();
            dispatch({type: act.setAreaList, areas});
        };
        $();
    }, [])
    return (
        <NewRouteFormContext.Provider value = {{ ...state, dispatch }}>
            {props.children}
        </NewRouteFormContext.Provider>
    )
}

export default NewRouteFormContextProvider;