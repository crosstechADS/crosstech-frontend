import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AlunoHome.css'
import Api from '../../../config/Api';
import Loading from '../../../components/Loading';

function AlunoHome({ email }) {
    const [treinos, setTreinos] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);

    useEffect(() => {
        Api.post('/treinoSelect', {
            email: email,
        }).then((response) => {
            setTreinos(response.data);
            setRemoveLoading(true);
        }).catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <div className='aluno-home'>
                <h2>Treinos</h2>

                {treinos.map((data) => {

                    return (
                        <Treinos key={data.ID_TREINO}
                        treino={data}/>
                    )
                })}

            </div>

            {!removeLoading && <Loading />}
        </div>
    );

}

export default AlunoHome

function Treinos(props) {
    const { DS_TREINO, OBS_TREINO, ID_TREINO } = props.treino;
    let history = useHistory();

    const redirect = () => {
        history.push(`/alunotreino/${ID_TREINO}`);
    }

    return (
        <div className='treino'>
            <h2>{DS_TREINO}</h2>
            <p>{OBS_TREINO}</p>
            <button className='aluno-home-btn' onClick={redirect}>Realizar treino</button>
        </div>
    )
}