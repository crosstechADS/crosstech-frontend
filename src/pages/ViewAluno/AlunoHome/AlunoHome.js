import React, { useEffect, useState, PureComponent } from 'react';
import { useHistory } from 'react-router-dom';
import './AlunoHome.css'
import Api from '../../../config/Api';
import Loading from '../../../components/Loading';
import { useTranslation } from 'react-i18next';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Scatter,
} from 'recharts';

function AlunoHome({ email }) {
    const [treinos, setTreinos] = useState([]);
    const [treinosFeitos, setTreinosFeitos] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        Api.post('/treinoSelect', {
            email: email,
        }).then((response) => {
            setTreinos(response.data);
        }).catch((err) => console.log(err))
        Api.post('/selectTreinoAluno', {
            EMAIL: email,
        }).then((response) => {
            setTreinosFeitos(response.data);
        }).catch((err) => console.log(err))
        console.log(treinosFeitos)
        setRemoveLoading(true);
    }, []);

    return (
        <div>
            <div className='aluno-home'>
                <h2>{t('Treinos')}</h2>

                {treinos.map((data) => {

                    return (
                        <Treinos key={data.ID_TREINO}
                            treino={data} />
                    )
                })}

                <div className='grafico'>
                    <h2>Evolução Física</h2>
                    <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                        data={treinosFeitos}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 0,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="Id" scale="band" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Repetições" barSize={20} fill="#413ea0" />
                        <Line type="monotone" dataKey="Pesagem" stroke="#ff7300" />
                        <Scatter dataKey="Tempo" fill="red" />
                    </ComposedChart>
                    </ResponsiveContainer>
                </div>

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
            <button className='aluno-home-btn' onClick={redirect}>'Realizar treino'</button>
        </div>
    )
}