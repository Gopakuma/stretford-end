import React, { useState, useEffect } from "react";
import axios from "axios";
import './style/squad.css'

function Squad() {
    const [squadData, setSquadData] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/squad", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    }
                });
                if(res.status === 200) {
                    setSquadData(res.data.data);  
                    setStatus(false);            
                } else {
                    setStatus(true);   
                }

            } catch (error) {
                console.error("Error fetching squad data:", error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <div className="grid-container">
        {squadData.length > 0 ? (
          squadData.map((player, index) => (
            <div key={index} className="player-card">
              <h3>{player.name}</h3>
              <p>{player.position}</p>
              <p>{player.nationality}</p>
            </div>
          ))
        ) : (
          <p>Loading squad data...</p>
        )}
        {status ? <div className="status-error">Error</div> : ''}
      </div>
      
    );
}

export default Squad;
