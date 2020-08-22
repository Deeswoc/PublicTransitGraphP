import React, { useContext } from 'react'
import Select from 'react-select';
import { NewRouteFormContext } from '../Contexts/NewRouteFormContext'
let ExpandableList = (props) => {
    const { 
        areas
    } = useContext(NewRouteFormContext);
    return (
        <>
            {

                props.list.map((item, i) => {
                    return (
                        <>
                            <label>Midpoint</label>
                            <Select options={areas.map(area => { return { value: area.id, label: area.name } }).sort((a, b) => {
                                return a.label.localeCompare(b.label);
                            })} onChange={(e) => {
                                props.editValue(i, e.value)
                            }}></Select>
                            {props.columns.map((column) => (<input placeholder={column} onChange={(e) => {
                                props.editValue(i, e.target.value);
                            }} value={item}></input>))}
                            <button type="button" onClick={(e) => {
                                props.remove(i)
                            }}>-</button>
                        </>
                    );
                })}
        </>
    )
}

export default ExpandableList;