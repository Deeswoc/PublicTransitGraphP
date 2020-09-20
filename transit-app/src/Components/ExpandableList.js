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
                            <Select options={areas.map(area => { return { value: {id: area.id, name: area.name}, label: area.name } }).sort((a, b) => {
                                return a.label.localeCompare(b.label);
                            })} onChange={(e) => {
                                props.editName(i, e.value.name);
                                props.editID(i, e.value.id)
                            }}></Select>
                            {props.columns.map((column) => (<input placeholder={column} onChange={(e) => {
                                props.editName(i, e.target.value);
                            }} value={item.name}></input>))}
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