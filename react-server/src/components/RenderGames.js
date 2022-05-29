import React, { useContext } from 'react'
import data3 from '../dataset.json'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '../App.css'

import { GlobalContext } from '../context/GlobalState';


export const RenderGames = (props) => {
    const { addGame } = useContext(GlobalContext);

    let maxcount = 5;

    let filteredData = [];

    for (let index = 0; index < Object.keys( data3.appid ).length; index++) {
        if (maxcount === 0) {
            break;
        }
        else {
            if (data3['name'][index].toLowerCase().includes((props.input))) {
                maxcount--;
                filteredData.push([data3['appid'][index], data3['name'][index]]);
            }
        }
    }

    function handleClick(item){
        addGame(item)
        filteredData = []
        
    }


    return (
        <div>
        {props.input !== "" && 
        
        <div className = "dataResult">
            {filteredData.map((item) => (
                <div key = {item[0]} onClick={(e) => { handleClick(item[0]) }} className = "dataItem">
                    <p>{item[1]}</p>
                </div>
                // </li>
            ))}
        </div>}
        
        </div>
    )
}
