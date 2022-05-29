import React,{useState} from 'react'
import { RenderGames } from './RenderGames';

// Component takes input from user and renders RenderGames component with entered text as props for query result.

export const GetGame = () => {

    // If search button is triggered query results will be displayed
    const [showResult, setShowResult] = useState(false);

    // State variable for entered text in input
    const [Game, setGame] = useState('');


    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();

        setShowResult(false)
        setGame(lowerCase);
    };

    function clickHandler(){
        setShowResult(true)
    } 
    return (
        <>
            <h3>Add Preferred Game</h3>
                <div className="container">
                    <form onSubmit={e => {e.preventDefault();}} >
                        <input type="text" className="search-input" placeholder="Enter favourite game..." onChange={inputHandler} ></input>

                        <button className="search-button" onClick = {clickHandler} type = "button">
                            <i className="fas fa-search"></i>
                        </button>
                    </form>


                    {showResult === true &&  
                        <RenderGames input={Game}/>
                    }
                </div>
        </>
    )
}
