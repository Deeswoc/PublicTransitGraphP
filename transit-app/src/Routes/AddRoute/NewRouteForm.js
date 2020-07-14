import React, { useState, useContext,   } from 'react'
import '../../Styles/Forms/baseStyle.css'
import ExpandableList from '../../Components/ExpandableList'
import { NewRouteFormContext } from '../../Contexts/NewRouteFormContext'
import { actions as act } from '../../Contexts/NewRouteFormContextReducers/NewRouteFormContextReducer'

let MiddleTowns = (props) => {
    const { midPoints, dispatch } = useContext(NewRouteFormContext);
    let remove = (index)=>{
        dispatch({type:act.removeMidPoint, index})
    }
    let edit = (index, updatedMidPoint)=>{
        dispatch({type:act.setMidPointName, updatedMidPoint, index})
    }
    return (
        <ExpandableList list = {midPoints} columns = {['Name', 'Parish']} remove = {remove} editValue = {edit}/>
    )
}

let NewRouteForm = (props) => {
    
    const [townsOnRoute, setTownsOnRoute] = useState([]);
    const { 
        endPoints, 
        dispatch 
    } = useContext(NewRouteFormContext);
    const removeTownOnRoute = (index) => {
        setTownsOnRoute(townsOnRoute.filter((item, i)=>{
            return i !== index;
        }))
    }

    return (
        <form>
            <label htmlFor="EndpointA">EndpointA:</label>
            <input name="EndpointA" placeholder="e.g. Montego Bay" value={endPoints.A.name} onChange={(e)=>{
                dispatch({type: act.setEndPointAName, Name: e.target.value})
            }}></input>
            <label htmlFor="EndpointB">Endpoint:</label>
            <input name="EndpointB" placeholder="e.g. Kingston" value={endPoints.B.name} onChange={(e)=>{
                dispatch({type: act.setEndPointBName, Name: e.target.value})
            }}></input>
            <input name="corporate" type="checkbox"></input>
            <label htmlFor="corporate">Corporate</label>
            <fieldset>
                <legend>Fair</legend>
                <label htmlFor="adult">Adult</label>$ <input name="adult" type="number" min="0" step="10"></input>
                <label htmlFor="children">Children</label>$ <input name="children" type="number" min="0" step="10"></input>
                <label htmlFor="elders">Elders</label>$ <input name="elders" type="number" min="0" step="10"></input>
            </fieldset>
            <fieldset>
                <legend>Route</legend>
                <label htmlFor="EndA">Start/Destination</label><input name="EndA" placeholder="e.g. Montego Bay" value={endPoints.A.name} onChange={(e)=>{
                    dispatch({type: act.setEndPointAName, Name: e.target.value})
                }}></input>
                <button type="button" onClick={(e)=>{
                    dispatch({type: act.addMidPoint})   
                }}>+</button>
                <MiddleTowns remove={removeTownOnRoute} towns={[]}/>
                <label htmlFor="EndB">Start/Destination</label><input name="EndB" placeholder="e.g. Kingston" value={endPoints.B.name} onChange={(e)=>{
                    dispatch({type: act.setEndPointBName, Name: e.target.value})
                }}></input>
            </fieldset>
        </form>
    )
}





export default NewRouteForm;