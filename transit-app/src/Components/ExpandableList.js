import React from 'react'

let ExpandableList = (props) => {
    return(
        <>
        {
            
            props.list.map((item, i)=>{
                return (
                    <>
                        <label>Midpoint</label> 
                        {props.columns.map((column) => (<input placeholder={column} onChange = {(e)=>{
                            props.editValue(i, e.target.value);
                        }} value = {item}></input>))}
                        <button type = "button" onClick = {(e)=>{
                            props.remove(i)
                        }}>-</button>
                    </>
                );
            })}
        </>
    )
}

export default ExpandableList;