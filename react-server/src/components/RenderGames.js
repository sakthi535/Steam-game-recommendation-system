import React, { useContext } from 'react'
import data3 from '../dataset.json'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { GlobalContext } from '../context/GlobalState';


export const RenderGames = (props) => {
    const { addGame } = useContext(GlobalContext);

    let maxcount = 10;

    let filteredData = [];
    let cr = 0

    for (let index = 0; index < Object.keys( data3.appid ).length; index++) {
        cr++;
        if (maxcount === 0) {
            break;
        }
        else {
            console.log("he did this ", props.input)
            if (data3['name'][index].toLowerCase().includes((props.input))) {
                maxcount--;
                console.log("does it ",data3['appid'][index]);
                filteredData.push(data3['appid'][index]);
            }
        }
    }

    return (
        <Carousel>
            {filteredData.map((item) => (
                // <li key={item.appid} >
                <div key = {item.appid} onClick={(e) => { addGame(item) } } >
                    <img src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${item}/header.jpg`} width="430" ></img>
                </div>
                // </li>
            ))}
        </Carousel>
    )
}
