import React, { useState, useEffect } from 'react';
import _ from 'lodash';
export default function TransitMatrix (props) {
    const [towns, setTowns] = useState([
        {
            name:"",
            id:"", 
        },{
            name:"",
            id:"", 
        }]);
    let setMatrix = props.setMatrix;
    if(!_.isEqual(props.towns, towns))
        setTowns(props.towns);
    const [travelMatrix, setTravelMatrix] = useState({pickup:[
        {dropOff:[0, 0]},
        {dropOff:[0, 0]}
    ]});
    useEffect(()=>{
        let matrix = {pickup: towns.map((town, i)=>{
            return {
                name:town.name,
                uuid: town.id,
                dropOff:towns.map((townn)=>{
                return {uuid: townn.id, fare: 0}
            })}
        })}
        setTravelMatrix(matrix);
    }, [towns]);
    return (
        <table className="table table-dark table-striped">
            <thead className="bg-primary">
                <TitleX towns={towns}/>
            </thead>
            <tbody>
                {
                    travelMatrix.pickup.map((pickupArea, row) => {
                        return (
                            <tr>
                                <TitleY head={towns[row].name}/>
                                {travelMatrix.pickup.map((dropOffLocation, column) =>{
                                    return (<td>
                                        <input value={travelMatrix.pickup[row].dropOff[column].fare} type="number" style={{background: 'none', border: 'none', color: 'white'}}  onChange={(e)=>{
                                            
                                            let newMatrix = {
                                                
                                                pickup: travelMatrix.pickup.map((pick, k)=>{
                                                if(k === row || k === column){
                                                    return {...pick, dropOff: travelMatrix.pickup[k].dropOff.map((drop, l)=>{
                                                        if(l!==k && (l === column || l === row)){
                                                            return {...drop, fare: parseInt(e.target.value)};
                                                        }else return drop
                                                    })}
                                                } else return pick;
                                            })}; 
                                            setTravelMatrix(newMatrix);
                                            setMatrix(newMatrix);
                                        }}></input>
                                    </td>)
                                })}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

let TitleX = function(props){
    return (
        <tr >
            <th>
                From
            </th>
            {props.towns.map(town=>{
                return (<th className="bg-primary">{town.name}</th>);
            })}  
        </tr>)
}

let TitleY = function(props){
    return (
        <th className="bg-primary">{props.head}</th>
    )
}