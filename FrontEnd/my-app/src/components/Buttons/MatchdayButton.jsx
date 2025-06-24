import React from 'react'
import { useNavigate } from 'react-router-dom'

function MatchdayButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/matchday');
    }

  return (
    <>
        <button onClick={handleClick}>
            Matchday
        </button>
    </>
  )
}

export default MatchdayButton