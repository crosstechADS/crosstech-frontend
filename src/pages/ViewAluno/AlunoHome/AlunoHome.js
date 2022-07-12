import React, { useEffect, useState, PureComponent } from 'react';
import { useHistory } from 'react-router-dom';
import './AlunoHome.css';
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
    Pie,
    PieChart,
    Cell,
    Sector
} from 'recharts';
import { Dropdown } from 'semantic-ui-react';

function AlunoHome({ email }) {
    const [treinos, setTreinos] = useState([]);
    const [treinosFeitos, setTreinosFeitos] = useState([]);
    const [tiposExercicios, setTiposExercicios] = useState([]);
    const [exercicios, setExercicios] = useState([]);
    const [exercicio, setExercicio] = useState("");
    const [removeLoading, setRemoveLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        Api.post('/treinoSelect', {
            email: email,
        }).then((response) => {
            setTreinos(response.data);
        }).catch((err) => console.log(err))
        Api.post('/selectTreinoAlunoExercicios', {
            EMAIL: email,
        }).then((response) => {
            setExercicios(response.data);
        }).catch((err) => console.log(err))
        Api.post('/selectTreinoAlunoTipos', {
            EMAIL: email,
        }).then((response) => {
            setTiposExercicios(response.data);
        }).catch((err) => console.log(err))
        console.log(treinosFeitos)
        setRemoveLoading(true);
    }, []);

    const exercicioOptions = exercicios.map((value) => ({
        key: value.ds_exercicio,
        text: value.ds_exercicio,
        value: value.id_exercicio
    }));

    const changeExercicio = (e, data) => {
        setExercicio(data.value);
        Api.post("/selectTreinoAluno", {
            EMAIL: email,
            idExercicio: exercicio
        }).then((response) => {
            setTreinosFeitos(response.data);
        }).catch((err) => console.log(err));
    }

    const COLORS = ['#DC143C', '#4A7289', '#086166', '#874706'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <div className='aluno-container'>
            <div className='aluno-home'>
                <h2>{t('Treinos')}</h2>

                {treinos.map((data) => {

                    return (
                        <Treinos key={data.ID_TREINO}
                            treino={data} />
                    )
                })}

                {/*Gráficos do usuário*/}

                <div className='grafico'>
                    <h2>Gráfico de Desempenho por Exercício</h2>

                    <h3>Escolha um exercício:</h3>
                    <Dropdown
                        name="exercicio"
                        value={exercicio}
                        placeholder={t("Exercício")}
                        search
                        selection
                        options={exercicioOptions}
                        onChange={(e, data) => changeExercicio(e, data)} />
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
                            <CartesianGrid stroke="#000" />
                            <XAxis dataKey="Data" scale="auto" type="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Repetições" barSize={20} fill="#413ea0" />
                            <Line type="monotone" dataKey="Pesagem" stroke="#ff7300" />
                            <Scatter dataKey="Tempo" fill="red" />
                        </ComposedChart>
                    </ResponsiveContainer>

                    <h2>Frequência de Realização de Exercício por Tipo</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Tooltip />
                            <Legend />
                            <Pie
                                data={tiposExercicios}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={105}
                                fill="#8884d8"
                                dataKey="Realizacoes"
                            >
                                {tiposExercicios.map((entry, index) => (
                                    <Cell name={entry.Exercicio} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
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
            <button className='aluno-home-btn' onClick={redirect}>Realizar treino</button>
        </div>
    )
}