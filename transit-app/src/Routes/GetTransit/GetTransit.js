import React, { useState, useEffect } from 'react'
import '../../Styles/Forms/baseStyle.css'
import Select from 'react-select';
import d from '../../devURL';

function GetTransit(props){
    const [townA, setTownA] = useState("");
    const [townB, setTownB] = useState("");
    const [areas, setAreas] = useState([]);
    // const [path, setPath] = useState([]);
    useEffect(()=>{ 
        let $ = async() => {
            const res = await fetch(`${d}/towns`);
            console.log(res);
            const towns = await res.json();
            setAreas(towns);
        };
        $();
    }, [])

    return (
        <>
            <Select options={areas.map(area => { return { value: {id: area.id, name: area.name}, label: area.name } }).sort((a, b) => {
                return a.label.localeCompare(b.label);
            })} onChange={(e) => {
                setTownA(e.value.id);
            }}></Select>

            <Select options={areas.map(area => { return { value: {id: area.id, name: area.name}, label: area.name } }).sort((a, b) => {
                return a.label.localeCompare(b.label);
            })} onChange={(e) => {
                setTownB(e.value.id);
            }}></Select>
        <button onClick={async ()=>{
            const res = await fetch(`${d}/routes/shortest-path?townA=${townA}&townB=${townB}`);
            console.log(res);
            // const path = await res.json();
            // setPath(path);
        }}>Check</button>
        {/* <Route route = {path}/> */}
        </>
    )
}

// function Route(props){
//     if(props.route.length!==0)
//         return(<>
//             <table className="table table-dark table-striped">
//                 <thead>
//                     <th>Area</th>
//                     <th>Transport</th>
//                     <th>Cost</th>
//                     <th>Total Cost</th>
//                 </thead>
//                 <tbody>
//                     {console.log("Route", props.route)}
//                     {props.route.map((element, i) => {
//                         if(i%2 === 0 && i<(props.route.length-1) ){
//                             console.log("Props.route", props.route)
//                             return(
//                             <tr>
//                                 <td>{element.item.Name}</td>
//                                 <td>{props.route[i + 1].item.Name}</td>
//                                 <td>{element.cost - ((i<=1)? 0 : props.route[i-2].cost)}</td>
//                                 <td>{element.cost}</td>
//                             </tr>)
//                         }
//                     })}
//                     <tr>
//                         <td>{props.route[props.route.length-1].item.Name}</td>
//                         <td>{props.route[props.route.length-1].item.Name}</td>
//                         <td>{props.route[props.route.length-1].cost - props.route[props.route.length-3].cost}</td>
//                         <td>{props.route[props.route.length-1].cost}</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </>
//     )
//     else 
//         return (<>No path yet</>)
// }


export default GetTransit;