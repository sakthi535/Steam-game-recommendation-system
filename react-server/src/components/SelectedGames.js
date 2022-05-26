import React, { useContext } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { GlobalContext } from '../context/GlobalState';
import {Results} from './Results.js'

import '../App.css'

export const SelectedGames = () => {
    // console.dir(GlobalContext);

    const { Selected,removeGame, addGame } = useContext(GlobalContext);
    
    const selectedGames = Selected.map((game) =>
        <div key = "{game}" onClick={() => removeGame(game)}>
            <img src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game}/header.jpg`} className = "image" ></img>
        </div>
    );

    return (
        <div>
            <Carousel>
                {selectedGames}
            </Carousel>            
            <Results />

        </div>
    )
}
