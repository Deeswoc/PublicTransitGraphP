import { v4 as uuid} from 'uuid'

export default function newTownFormContextReducer(state, action){
    switch(action.type){
        case 'ADD_TOWN_SUBMITION': {
            return {
                ...state,
                townsToSubmit: [...state.townsToSubmit, {
                    id: uuid(),
                    name: state.name,
                    parish: state.parish,
                    categories: state.categories
                }]
            }
        }
        case 'ADD_CATEGORY':{
            if(state.catList.length>0) {
                let currentCat = state.catList.filter(category => category.id.localeCompare(state.category) === 0)[0];
                return {
                   ...state,
                   catList: state.catList.filter(category => category.id.localeCompare(state.category) !== 0),
                   categories: [...state.categories, currentCat],
                };
             }
             return state;
       }

        case 'SET_CATLIST': {
            return {
                ...state,
                catList: action.catList
            }
        }

        case 'REMOVE_CATEGORY':{
            if(state.categories.length>0){
                return {
                    ...state, 
                    categories: state.categories.filter(category => category.id.localeCompare(action.cat)!==0),
                    catList: [...state.catList, state.categories.filter(category => category.id.localeCompare(action.cat)===0)[0]]
                }
            } else return state;
        }

        case 'RESET_FORM':{
            return {
                ...state,
                name: '',
                parish: '',
                catList:[ ...state.catList, ...state.categories ],
                categories: []
            }
        }

        case 'UPDATE_TOWN':{
            let nextState = { ...state, name: action.town.name};
            return nextState;
        }

        case 'UPDATE_PARISH':{
            let nextState = { ...state, parish: action.town.parish};
            return nextState;
        }

        case 'STATE':{
            let nextState = { ...state, ...action.$};
            return nextState;
        }

        default: {
            return state;
        }
    }
}

export let actions = {
    ADD_TOWN_SUBMITION: 'ADD_TOWN_SUBMITION',
    ADD_CATEGORY:'ADD_CATEGORY',
    SET_CATLIST:'SET_CATLIST',
    REMOVE_CATEGORY:'REMOVE_CATEGORY',
    RESET_FORM: 'RESET_FORM',
    UPDATE_TOWN: 'UPDATE_TOWN',
    UPDATE_PARISH: 'UPDATE_PARISH',
    STATE: 'STATE',
    
}