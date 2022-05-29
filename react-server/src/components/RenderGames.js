import React, { useContext } from 'react'
import data3 from '../dataset.json'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../App.css'

// Context Api is used to add, remove and view the selected games by user
import { GlobalContext } from '../context/GlobalState';

// The component takes user's input as prop to search through dataset and display query result. 

export const RenderGames = (props) => {

    // AddGame method from global context adds game its appid to list of games  
    const { addGame } = useContext(GlobalContext);

    let maxcount = 5;

    // Search through dataset that contains input, end the search if 5 games are selected
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
