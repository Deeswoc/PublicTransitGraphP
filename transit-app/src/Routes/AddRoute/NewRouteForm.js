import React, { useState, useContext, } from 'react'
import '../../Styles/Forms/baseStyle.css'
import ExpandableList from '../../Components/ExpandableList'
import { NewRouteFormContext } from '../../Contexts/NewRouteFormContext'
import { actions as act } from '../../Contexts/NewRouteFormContextReducers/NewRouteFormContextReducer'
import Select from 'react-select';
import d from '../../devURL';

//temp  
import 'bootstrap/dist/css/bootstrap.css';
let MiddleTowns = (props) => {
    const { midPoints, dispatch } = useContext(NewRouteFormContext);
    let remove = (index) => {
        dispatch({ type: act.removeMidPoint, index })
    }
    let edit = (index, updatedMidPoint) => {
        dispatch({ type: act.setMidPointName, updatedMidPoint, index })
    }
    return (
        <ExpandableList list={midPoints} columns={['Name']} remove={remove} editValue={edit} />
    )
}

let NewRouteForm = (props) => {

    const [townsOnRoute, setTownsOnRoute] = useState([]);
    const {
        endPoints,
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
            <Select options={areas.map(area => { return { value: area.id, label: area.name } }).sort((a, b) => {
                return a.label.localeCompare(b.label);
            })} onChange={(e) => {
                dispatch({ type: act.setEndPointAName, Name: e.value })
            }}></Select>
            <label htmlFor="EndpointA">EndpointA:</label>
            <input name="EndpointA" placeholder="e.g. Montego Bay" value={endPoints.A.name} onChange={(e) => {
                dispatch({ type: act.setEndPointAName, Name: e.target.value })
            }}></input>
            <Select options={areas.map(area => { return { value: area.id, label: area.name } }).sort((a, b) => {
                return a.label.localeCompare(b.label);
            })} onChange={(e) => {
                dispatch({ type: act.setEndPointBName, Name: e.value })
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
                        fare: e.target.value
                    })
                }}></input>
                <label htmlFor="via">Via</label>$ <input name="children" type="number" min="0" step="5" value={fare.via} onChange={(e) => {
                    dispatch({
                        type: act.setViaFare,
                        fare: e.target.value
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
        </form>
    )
}





export default NewRouteForm;