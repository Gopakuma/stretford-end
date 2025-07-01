import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style/Matchday.css';

function Matchday() {
    const [matchdayData, setMatchdayData] = useState([]);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/matchday", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    }
                });

                if (res.status === 200) {
                    setMatchdayData(res.data.data);
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error("Error fetching matchday data:", error);
                setStatus('error');
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid-container">
            {status === 'error' && <div className="error-message">Error fetching data!</div>}
            {status === 'success' ? (
                matchdayData.length > 0 ? (
                    matchdayData.map((item, index) => (
                        <div key={index} className="match-card">
                            <h3 className="match-date">{new Date(item.matchDay).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</h3>
                            <p className="match-time">{item.matchTime}</p>
                            <p className="match-teams">{item.home} : 0 </p>
                            <p className="match-teams">{item.away} : 0 </p>
                        </div>
                    ))
                ) : (
                    <p className="loading-message">No matchday data available.</p>
                )
            ) : (
                <p className="loading-message">Loading matchday data...</p>
            )}
        </div>
    );
}

export default Matchday;
