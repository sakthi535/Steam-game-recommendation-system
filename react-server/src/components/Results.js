import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios'


import '../App.css'

export const Results = () => {

    // Use Global Context to get user selected games 
    const {Selected} = useContext(GlobalContext);
    // console.log("check here : ",{"list":Selected})

    // Games chosen to recommend
    const [data, setData] = useState({"list":Selected})
    const [buttonState, setIsPending] = useState("")

    console.log("check another here : ", data)
    
    const selectedToBeSent = {"list":Selected};
    
    // Post request to backend for recommended games
    function FetchRecommendations () {
        setIsPending("Disabled")
        axios.post(`/recommend/`,selectedToBeSent)
      .then(res => {

        // console.log("rers her ",res);
        // console.log("data herer", res.data['list']);
        
        // Set chosen data to display 
        setData(res.data)
        setIsPending("")
      })
      .catch(function (error){
          console.log(error.toJSON())
      })
      
    }

    // Iterate the array inside data object and create a div for each game to be displayed
    // Api Call to retrieve poster image for each game with its appid/gameid
    const selectedResult = data['list'].map((gameid) =>
        <div key="{game}">
            <img src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${gameid}/header.jpg`} className="image" ></img>
        </div>
    );

    return (
        <div>
            
            {data['list'] !==[] &&
            // Display Images as carousel and not if no games are recommended
            <Carousel>
                {selectedResult}
            </Carousel>}

             
            <button className={`btn ${buttonState}`} onClick = {FetchRecommendations} >Click Here</button>

        </div>
    )
}
