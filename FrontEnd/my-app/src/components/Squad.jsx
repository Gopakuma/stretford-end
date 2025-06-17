import React, { useState, useEffect } from "react";
import axios from "axios";

function Squad() {
    const [squadData, setSquadData] = useState([]);
    const [status, setStatus] = useState();

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
                    setStatus(true);            
                } else {
                    setStatus(false);   
                }

            } catch (error) {
                console.error("Error fetching squad data:", error);
            }
        };
        
        fetchData();
    }, [squadData]);

    return (
        <div>
            {squadData.length > 0 ? (
                squadData.map((player, index) => (
                    <div key={index}>
                        <h3>{player.name}</h3>
                        <p>{player.position}</p>
                        <p>{player.nationality}</p>
                    </div>
                ))
            ) : (
                <p>Loading squad data...</p>
            )}
        {status ? <div> Error </div> : ''}
        </div>
    );
}

export default Squad;
