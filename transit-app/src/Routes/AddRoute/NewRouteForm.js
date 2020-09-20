import React, { useState, useContext, } from 'react'
import '../../Styles/Forms/baseStyle.css'
import ExpandableList from '../../Components/ExpandableList'
import { NewRouteFormContext } from '../../Contexts/NewRouteFormContext'
import { actions as act } from '../../Contexts/NewRouteFormContextReducers/NewRouteFormContextReducer'
import Select from 'react-select';
import d from '../../devURL';

//temp  
import 'bootstrap/dist/css/bootstrap.css';
import TransitMatrix from '../../Components/TransitMaxtrix'
let MiddleTowns = (props) => {
    const { midPoints, dispatch } = useContext(NewRouteFormContext);
    let remove = (index) => {
        dispatch({ type: act.removeMidPoint, index })
    }
    let editName = (index, name) => {
        dispatch({ type: act.setMidPointName, name, index })
    }
    let editID = (index, ID) => {
        dispatch({ type: act.setMidPointID, ID, index })
    }
    return (
        <ExpandableList list={midPoints} columns={['Name']} remove={remove} editName={editName} editID={editID}/>
    )
}

let NewRouteForm = (props) => {

    const [townsOnRoute, setTownsOnRoute] = useState([]);
    const {
        endPoints,
        transitMatrix,
        fare,
        dispatch,
        areas, 
        midPoints
    } = useContext(NewRouteFormContext);
    const removeTownOnRoute = (index) => {
        setTownsOnRoute(townsOnRoute.filter((item, i) => {
            return i !== index;
        }))
    }

    return (
        <form>
            <Select options={areas.map(area => { return { value: {id: area.id, name: area.name}, label: area.name } }).sort((a, b) => {
                return a.label.localeCompare(b.label);
            })} onChange={(e) => {
                dispatch({ type: act.setEndPointAName, Name: e.value.name });
                dispatch({type: act.setEndPointAID, id: e.value.id});
            }}></Select>
            <label htmlFor="EndpointA">EndpointA:</label>
            <input name="EndpointA" placeholder="e.g. Montego Bay" value={endPoints.A.name} onChange={(e) => {
                dispatch({ type: act.setEndPointAName, Name: e.target.value })
            }}></input>
            <Select options={areas.map(area => { return { value: {id: area.id, name: area.name}, label: area.name } }).sort((a, b) => {
                return a.label.localeCompare(b.label);
            })} onChange={(e) => {
                dispatch({ type: act.setEndPointBName, Name: e.value.name });
                dispatch({type: act.setEndPointBID, id: e.value.id});
            }}></Select>
            <label htmlFor="EndpointB">Endpoint:</label>
            <input name="EndpointB" placeholder="e.g. Kingston" value={endPoints.B.name} onChange={(e) => {
                dispatch({ type: act.setEndPointBName, Name: e.target.value })
            }}></input>
            <input name="corporate" type="checkbox"></input>
            <label htmlFor="corporate">Corporate</label>
            <fieldset>
                <legend>Fair</legend>
                <label htmlFor="end_to_end">End to End</label>$ <input name="end_to_end" type="number" min="0" step="5" value={fare.origin} onChange={(e) => {
                    dispatch({
                        type: act.setOriginFare,
                        fare: parseInt(e.target.value)
                    })
                }}></input>
                <label htmlFor="via">Via</label>$ <input name="children" type="number" min="0" step="5" value={fare.via} onChange={(e) => {
                    dispatch({
                        type: act.setViaFare,
                        fare: parseInt(e.target.value)
                    })
                }}></input>
            </fieldset>
            <fieldset>
                <legend>Route</legend>
                <label htmlFor="EndA">Start/Destination</label><input name="EndA" placeholder="e.g. Montego Bay" value={endPoints.A.name} onChange={(e) => {
                    dispatch({ type: act.setEndPointAName, Name: e.target.value })
                }}></input>
                <button type="button" className="btn btn-dark" onClick={(e) => {
                    dispatch({ type: act.addMidPoint })
                }}>+</button>
                <MiddleTowns remove={removeTownOnRoute} towns={[]} />
                <label htmlFor="EndB">Start/Destination</label><input name="EndB" placeholder="e.g. Kingston" value={endPoints.B.name} onChange={(e) => {
                    dispatch({ type: act.setEndPointBName, Name: e.target.value })
                }}></input>
            </fieldset>
            <button type='submit' onClick={(e)=>{
                e.preventDefault();
                
                let path = [endPoints.A.name, ...midPoints, endPoints.B.name]
                let route = {
                    fare, 
                    path
                }
                fetch(`${d}/routes`, {
                    method:'POST',
                    headers:{
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify(route)
                })
                .then(response=>{
                    if(response.status===201){
                        alert('Added the route');
                    }
                    console.log(response.status);
                })
            }}>
                Submit
            </button>
            <TransitMatrix towns = {[endPoints.A, ...midPoints, endPoints.B]} transitMatrix={transitMatrix} setMatrix={(newMatrix)=>{
                dispatch({type: act.setMatrix, matrix: newMatrix});
            }}>

            </TransitMatrix>
        </form>


    )
}





export default NewRouteForm;