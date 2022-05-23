import React, {useState, useEffect} from 'react';
import './AlunoTreino.css';
import useTimer from '../../../hooks/useTimer';
import {formatTime} from '../../../utils/formatTime'
import Api from '../../../config/Api';
import Loading from '../../../components/Loading';

function AlunoTreinos({email}){
    const {timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset} = useTimer(0);
    const [treinos, setTreinos] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);

    useEffect(() => {}, [])

    return(
        <div className='treinos'>

        {!removeLoading && <Loading />}
        </div>
    )
}

export default AlunoTreinos