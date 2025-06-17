import React from 'react'
import { useNavigate } from 'react-router-dom'

function SquadButton() {
    const navigate = useNavigate();
    const handleOnClickSquad = (e) => {
        e.preventDefault();
        navigate('/squad')
      }
    return (
        <>
            <button className='btn-squad' onClick={handleOnClickSquad}>
                Squad
            </button>
        </>
    )
}

export default SquadButton