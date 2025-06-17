import React from 'react'
import { useNavigate } from 'react-router-dom';

function Backbutton({path}) {
    const navigate = useNavigate();
    const handleOnClickBack = (e) => {
        e.preventDefault();
        navigate(path)
    }
    return (
        <button className='btn-back' onClick={handleOnClickBack}>
            Back
        </button>
    )
}

export default Backbutton