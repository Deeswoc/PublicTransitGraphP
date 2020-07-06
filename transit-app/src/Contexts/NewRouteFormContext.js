import React, { createContext, useReducer } from 'react'
import newRouteFormContextReducer from './NewRouteFormContextReducers/NewRouteFormContextReducer.js';
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
            endToEnd: {
                Adult: 0,
                Child: 0,
                Elder: 0
            },
            via: {
                Adult: 0,
                Child: 0,
                Elder: 0
            }
        },
        corperate: false,
        class: ""
    }
    const [state, dispatch] = useReducer(newRouteFormContextReducer, initialState);
    return (
        <NewRouteFormContext.Provider value = {{ ...state, dispatch }}>
            {props.children}
        </NewRouteFormContext.Provider>
    )
}

export default NewRouteFormContextProvider;