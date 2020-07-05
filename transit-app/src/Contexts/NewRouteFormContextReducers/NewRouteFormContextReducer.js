export default newRouteFormContextReducer;

function newRouteFormContextReducer(state, action){
    switch(action.type){
        case actions.addMidPoint:{
            return {...state, midPoints: [...state.midPoints, ""]}
        }   
        case actions.setEndPointA:{
            return {...state, endPoints: {...state.endpoints, A: action.endPointA}}
        }
        case actions.setEndPointB:{
            return {...state, endPoints: {...state.endpoints, B: action.endPointB}}
        }
        case actions.editMidPoint:{
            return ({...state, midPoints: [...state.midPoints.map((midPoint, i)=>{
                if(i===action.index)
                    return action.updatedMidPoint;
                else
                    return midPoint;
            })]}) 
        }
        case actions.removeMidPoint:{
            console.log(action);

            return {...state, midPoints: [...state.midPoints.filter((midPoint, i)=>{
                return i !== action.index;
            })]}
        }

        default: {
            return state;
        }
    }
}

export let actions = {
    addMidPoint: 0,
    setEndPointA: 1,
    setEndPointB: 2,
    editMidPoint: 3,
    removeMidPoint: 4
}