import React, { createContext, useReducer } from 'react'
import newRouteFormContextReducer from './NewRouteFormContextReducers/NewRouteFormContextReducer.js';
export const NewRouteFormContext = createContext();



function NewRouteFormContextProvider(props){
    const initialState = {
        endPoints: {
            A: {},
            B: {}
        },
        midPoints: [],
    }
    const [state, dispatch] = useReducer(newRouteFormContextReducer, initialState);
    return (
        <NewRouteFormContext.Provider value = {{ ...state, dispatch }}>
            {props.children}
        </NewRouteFormContext.Provider>
    )
}

export default NewRouteFormContextProvider;