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
                    return {...midPoint, name:action.name};
                else
                    return midPoint;
            })]}) 
        }

        case actions.setMidPointID:{
            return ({...state, midPoints: [...state.midPoints.map((midPoint, i)=>{
                if(i===action.index)
                    return {...midPoint, id:action.ID};
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

        case actions.setOriginFare:{
            return {
                ...state,
                fare: {
                    ...state.fare,
                    origin: action.fare
                }
            }
        }

        case actions.setViaFare:{
            return {
                ...state,
                fare: {
                    ...state.fare,
                    via: action.fare
                }
            }
        }

        case actions.setAreaList:{
            return {
                ...state,
                areas: action.areas
            }
        }

        case actions.setEndPointAID:{
            return {
                ...state, endPoints: {
                    ...state.endPoints, 
                    A: {
                        ...state.endPoints.A, 
                        id: action.id
                    }
                }
            }
        }


        case actions.setEndPointBID:{
            return {
                ...state, endPoints: {
                    ...state.endPoints, 
                    B: {
                        ...state.endPoints.B, 
                        id: action.id
                    }
                }
            }
        }



        case actions.setMatrix:{
            return {
                ...state,
                matrix: action.matrix
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
    setEndPointAID: 2,
    setEndPointBName: 3,
    setEndPointBID: 4,
    setMidPointName: 5,
    setMidPointParish: 7,
    removeMidPoint: 8,
    setOriginFare: 9,
    setViaFare: 10,
    setMatrix: 12,
    setAreaList: 11,
    setMidPointID: 13
}