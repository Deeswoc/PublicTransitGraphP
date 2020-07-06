export default newRouteFormContextReducer;

function newRouteFormContextReducer(state, action){
    switch(action.type){
        
        case actions.addMidPoint:{
            return {
                ...state, 
                midPoints: [
                    ...state.midPoints, 
                    ""
                ]
            }
        }   

        case actions.setEndPointAName:{
            return {
                ...state, 
                endPoints: {
                    ...state.endPoints, 
                    A: {
                        ...state.endPoints.A, 
                        name: action.Name
                    }
                }
            }
        }

        case actions.setEndPointBName:{
            return {
                ...state, endPoints: {
                    ...state.endPoints, 
                    B: {
                        ...state.endPoints.B, 
                        name: action.Name
                    }
                }
            }
        }

        case actions.setMidPointName:{
            return ({...state, midPoints: [...state.midPoints.map((midPoint, i)=>{
                if(i===action.index)
                    return action.updatedMidPoint;
                else
                    return midPoint;
            })]}) 
        }

        case actions.removeMidPoint:{
            console.log(action);

            return {
                ...state, 
                midPoints: [
                    ...state.midPoints.filter((midPoint, i)=>{
                        return i !== action.index;
                    })
                ]
            }
        }

        default: {
            return state;
        }
    }
}

export let actions = {
    addMidPoint: 0,
    setEndPointAName: 1,
    setEndPointAParish: 2,
    setEndPointBName: 3,
    setEndPointBParish: 4,
    setMidPointName: 5,
    setMidPointParish: 7,
    removeMidPoint: 8
}