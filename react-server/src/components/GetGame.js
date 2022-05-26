import React,{useState} from 'react'

import { RenderGames } from './RenderGames';

import TextField from "@mui/material/TextField";

export const GetGame = () => {

    const [Game, setGame] = useState('');

    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setGame(lowerCase);
    };


    return (
        <>
            <h3>Add Preferred Game</h3>
            <form >
                <div className="container">
                    {/* <div className ="d-flex justify-content-center h-10 searchbar"> */}
                        <TextField
                            id = "standard"
                            onChange={inputHandler}
                            fullWidth
                            // class = "search-input"
                            type = "text"
                            placeholder = "Enter favourite game..."
                        />
                    {/* </div> */}

                </div>
                {/* <button className="btn">Add Game</button> */}

                <RenderGames input={Game} />

            </form>
        </>
    )
}
