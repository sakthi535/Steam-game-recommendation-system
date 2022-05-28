import React,{useState} from 'react'
import { RenderGames } from './RenderGames';

export const GetGame = () => {

    const [showResult, setShowResult] = useState(false);
    const [Game, setGame] = useState('');

    let inputHandler = (e) => {
        //convert input text to lower case
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
                    <form >
                        <input type="text" className="search-input" placeholder="Enter favourite game..." onChange={inputHandler}></input>

                        <button className="search-button" onClick = {clickHandler} type = "button">
                            <i className="fas fa-search"></i>
                        </button>
                    </form>

                    {showResult ==true &&  
                        <RenderGames input={Game} changeState ={setShowResult}/>
                    }
                    
                    
                </div>
        </>
    )
}
