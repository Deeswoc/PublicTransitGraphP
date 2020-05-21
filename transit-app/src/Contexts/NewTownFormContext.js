import React, { createContext, useReducer, useEffect } from 'react'
import d from '../devURL';
import newTownFormContextReducer, { actions as act} from './NewTownFormContextReducers/newTownFormContextReducer';
export const NewTownFormContext = createContext();


function NewTownFormContextProvider (props){
    const initialState = {
        towns:[],
        name: '',
        parish: '',
        category: '',
        townsToSubmit: [],
        categories:[],
        catList:[],
    }

    const [state, dispatch] = useReducer(newTownFormContextReducer, initialState);
    useEffect(()=>{ 
        let $ = async() => {
            let data = await fetch(`${d}/town/get-categories`);
            let catList = await data.json();
            dispatch({type: act.SET_CATLIST, catList});
        };
        $();
    }, [])

    return(
        <NewTownFormContext.Provider value={{ ...state, dispatch  }}>
            {props.children}
        </NewTownFormContext.Provider>  
    );

}

export default NewTownFormContextProvider;