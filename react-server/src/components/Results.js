import React, { useState, useContext} from 'react'
import { Carousel } from 'react-responsive-carousel';

// Context Api is used to add, remove and view the selected games by user
import { GlobalContext } from '../context/GlobalState';

// Axios package is used to make post request to backend of application
import axios from 'axios'

// The component renders games recommended by backend of application based on user selection

import '../App.css'

export const Results = () => {

    // Global Context to get user selected games 
    const {Selected} = useContext(GlobalContext);

    // Games chosen to recommend, response from post request
    const [data, setData] = useState({"list":Selected})
    
    const [buttonState, setIsPending] = useState("")

    const selectedToBeSent = {"list":Selected};
    
    function FetchRecommendations () {
        setIsPending("Disabled")
        axios.post(`/recommend/`,selectedToBeSent)
      .then(res => {
        setData(res.data)
        setIsPending("")
      })
      .catch(function (error){
          console.log(error.toJSON())
      })
      
    }

    // Display images of recommended games as carousel 
    const selectedResult = data['list'].map((gameid) =>
        <div key="{game}">
            <img src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${gameid}/header.jpg`} className="image" ></img>
        </div>
    );

    return (
        <div>
            
            {data['list'] !==[] &&
            <Carousel>
                {selectedResult}
            </Carousel>}

            {/* Waiting for response from post request */}
            <button className={`btn ${buttonState}`} onClick = {FetchRecommendations} >Recommend Me!</button>

        </div>
    )
}
