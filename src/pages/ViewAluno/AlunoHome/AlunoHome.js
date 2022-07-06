import React, { useEffect, useState, PureComponent, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './AlunoHome.css';
import formatTime from '../../../utils/formatTime.js'
import Api from '../../../config/Api';
import Loading from '../../../components/Loading';
import { useTranslation } from 'react-i18next';
import { useTimer } from 'use-timer';
import { Button, Form, Header, Icon, Image, Input, Modal } from 'semantic-ui-react';
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
    const [tempo, setTempo] = useState(60);
    const { time, start, pause, reset, status, advanceTime } = useTimer({
        timerType: 'DECREMENTAL',
        initialTime: tempo,
        endTime: 0
    });
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

    // const [firstOpen, setFirstOpen] = useState(false);
    // const [secondOpen, setSecondOpen] = useState(false);
    // const [thirdOpen, setThirdOpen] = useState(false);
    // const [final1Open, setFinal1Open] = useState(false);

    // const primeiroTreino = () => {
    //     setFirstOpen(true);
    //     start();
    //     advanceTime(-840);
    // }

    // const transicao1 = () => {
    //     setFirstOpen(false);
    //     setSecondOpen(true);
    //     reset();
    //     start();
    // }

    // const transicao2 = () => {
    //     setSecondOpen(false);
    //     setThirdOpen(true);
    //     reset();
    //     start();
    //     advanceTime(-240);
    // }

    // const finalizar1 = () => {
    //     reset();
    //     setThirdOpen(false);
    //     setFinal1Open(true);
    // }

    // const [segundoTreino1Open, setSegundoTreino1Open] = useState(false);
    // const [segundoTreino2Open, setSegundoTreino2Open] = useState(false);
    // const [segundoTreino3Open, setSegundoTreino3Open] = useState(false);
    // const [final2Open, setFinal2Open] = useState(false);

    // const segundoTreino = () => {
    //     setSegundoTreino1Open(true);
    //     start();
    //     advanceTime(-1140);

    // }

    // const segundoTransicao1 = () => {
    //     setSegundoTreino1Open(false);
    //     setSegundoTreino2Open(true);
    //     reset();
    //     start();
    //     advanceTime(-60);
    // }

    // const segundoTransicao2 = () => {
    //     setSegundoTreino2Open(false);
    //     setSegundoTreino3Open(true);
    //     reset();
    //     start();
    //     advanceTime(-360);
    // }

    // const finalizar2 = () => {
    //     reset();
    //     setSegundoTreino3Open(false);
    //     setFinal2Open(true);
    // }

    // const [terceiroTreino1Open, setTerceiroTreino1Open] = useState(false);
    // const [terceiroTreino2Open, setTerceiroTreino2Open] = useState(false);
    // const [terceiroTreino3Open, setTerceiroTreino3Open] = useState(false);
    // const [final3Open, setFinal3Open] = useState(false);

    // const terceiroTreino = () => {
    //     setTerceiroTreino1Open(true);
    //     start();
    //     advanceTime(10);

    // }

    // const terceiroTransicao1 = () => {
    //     setTerceiroTreino1Open(false);
    //     setTerceiroTreino2Open(true);
    //     reset();
    //     start();
    //     advanceTime(-30);
    // }

    // const terceiroTransicao2 = () => {
    //     setTerceiroTreino2Open(false);
    //     setTerceiroTreino3Open(true);
    //     reset();
    //     start();
    //     advanceTime(-180);
    // }

    // const finalizar3 = () => {
    //     reset();
    //     setTerceiroTreino3Open(false);
    //     setFinal3Open(true);
    // }

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

                {/* <div className='treino'>
                    <h2>Treino funcional I</h2>
                    <p>Este treino é o primeiro de 3 treinos funcionais!</p>
                    <button className='aluno-home-btn' onClick={primeiroTreino}>'Realizar treino'</button>
                </div>

                <div className='treino'>
                    <h2>Treino funcional II</h2>
                    <p>Este treino é o segundo de 3 treinos funcionais!</p>
                    <button className='aluno-home-btn' onClick={segundoTreino}>'Realizar treino'</button>
                </div>

                <div className='treino'>
                    <h2>Treino funcional III</h2>
                    <p>Este treino é o terceiro de 3 treinos funcionais!</p>
                    <button className='aluno-home-btn' onClick={terceiroTreino}>'Realizar treino'</button>
                </div> 
                <Modal
                    dimmer={"blurring"}
                    onClose={() => setFirstOpen(false)}
                    onOpen={() => setFirstOpen(true)}
                    open={firstOpen}>
                    <Modal.Header>Esteira</Modal.Header>
                    <Modal.Content image>
                        <Image size='large' src="http://arte.folha.uol.com.br/cotidiano/2015/05/19/riscos-da-esteira/images/esteira.gif" />
                        <Header>Correr por 15 minutos</Header>
                        <Modal.Description>
                            <div key={tempo}>Tempo restante: {formatTime(time)}</div>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setFirstOpen(false)}>{t('Cancelar')}</Button>
                        <Button onClick={transicao1} primary color='green'>
                            {t('Próximo')} <Icon name='right chevron' />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    dimmer={"blurring"}
                    onClose={() => setSecondOpen(false)}
                    open={secondOpen}>
                    <Modal.Header>Jump Box</Modal.Header>
                    <Modal.Content image>
                        <Image size='large' src="https://cdn.shopify.com/s/files/1/0916/1708/files/Continual-Squat-Box-Springs_DSC00329.gif?v=1555004604" />
                        <Header>Execução durante 1 minuto</Header>
                        <Modal.Description>
                            Tempo restante: {formatTime(time)}
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setSecondOpen(false)}>{t('Cancelar')}</Button>
                        <Button primary color='green' onClick={transicao2}>
                            {t('Próximo')} <Icon name='right chevron' />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    dimmer={'blurring'}
                    onClose={() => setThirdOpen(false)}
                    open={thirdOpen}>
                    <Modal.Header>Abdominal bicicleta</Modal.Header>
                    <Modal.Content image>
                        <Image size='large' src="https://i.pinimg.com/originals/d8/76/16/d87616d4b21e886f009b24fe66db69d6.gif" />
                        <Header>Execução durante 5 minutos</Header>
                        <Modal.Description>
                            Tempo restante: {formatTime(time)}
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setThirdOpen(false)}>{t('Cancelar')}</Button>
                        <Button primary color='green' onClick={finalizar1}>
                            {t('Próximo')} <Icon name='right chevron' />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    dimmer={'blurring'}
                    onClose={() => setFinal1Open(false)}
                    open={final1Open}
                    size='small'
                >
                    <Modal.Header>Treino Funcional I concluído com sucesso!</Modal.Header>
                    <Modal.Actions>
                        <Button
                            icon='check'
                            content='Finalizar'
                            color='green'
                            onClick={() => setFinal1Open(false)}
                        />
                    </Modal.Actions>
                </Modal>


                <Modal
                    dimmer={"blurring"}
                    onClose={() => setSegundoTreino1Open(false)}
                    onOpen={() => setSegundoTreino1Open(true)}
                    open={segundoTreino1Open}>
                    <Modal.Header>Bicicleta</Modal.Header>
                    <Modal.Content image>
                        <Image size='large' src="https://c.tenor.com/BlX7MtdLF-cAAAAM/immersiva-spinning.gif" />
                        <Header>Realizar exercício durante 20 minutos</Header>
                        <Modal.Description>
                            <div key={tempo}>Tempo restante: {formatTime(time)}</div>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setSegundoTreino1Open(false)}>{t('Cancelar')}</Button>
                        <Button onClick={segundoTransicao1} primary color='green'>
                            {t('Próximo')} <Icon name='right chevron' />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    dimmer={"blurring"}
                    onClose={() => setSegundoTreino2Open(false)}
                    open={segundoTreino2Open}>
                    <Modal.Header>Prancha</Modal.Header>
                    <Modal.Content image>
                        <Image size='large' src="https://s2.glbimg.com/x3VH1LmLRWGmhnAQAtwRI3p4VoE=/0x0:724x483/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2018/B/x/lAitWISUudJmnVqf48rA/istock-578290582.jpg" />
                        <Header>Ficar na posição de prancha durante 2 minutos</Header>
                        <Modal.Description>
                            Tempo restante: {formatTime(time)}
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setSegundoTreino2Open(false)}>{t('Cancelar')}</Button>
                        <Button primary color='green' onClick={segundoTransicao2}>
                            {t('Próximo')} <Icon name='right chevron' />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    dimmer={'blurring'}
                    onClose={() => setSegundoTreino3Open(false)}
                    open={segundoTreino3Open}>
                    <Modal.Header>Pular corda</Modal.Header>
                    <Modal.Content image>
                        <Image size='large' src="https://treinodecorrida.com.br/wp-content/uploads/2019/01/sid0171.gif" />
                        <Header>Pular corda por 7 minutos</Header>
                        <Modal.Description>
                            Tempo restante: {formatTime(time)}
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setSegundoTreino3Open(false)}>{t('Cancelar')}</Button>
                        <Button primary color='green' onClick={finalizar2}>
                            {t('Próximo')} <Icon name='right chevron' />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    dimmer={'blurring'}
                    onClose={() => setFinal2Open(false)}
                    open={final2Open}
                    size='small'
                >
                    <Modal.Header>Treino Funcional II concluído com sucesso!</Modal.Header>
                    <Modal.Actions>
                        <Button
                            icon='check'
                            content='Finalizar'
                            color='green'
                            onClick={() => setFinal2Open(false)}
                        />
                    </Modal.Actions>
                </Modal>

                <Modal
                    dimmer={"blurring"}
                    onClose={() => setTerceiroTreino1Open(false)}
                    onOpen={() => setTerceiroTreino1Open(true)}
                    open={terceiroTreino1Open}>
                    <Modal.Header>Escalador</Modal.Header>
                    <Modal.Content image>
                        <Image size='large' src="https://static.wixstatic.com/media/2edbed_d0e96560f7274325861a6915af95fe73~mv2.gif" />
                        <Header>Realizar exercício durante 50 segundos</Header>
                        <Modal.Description>
                            <div key={tempo}>Tempo restante: {formatTime(time)}</div>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setTerceiroTreino1Open(false)}>{t('Cancelar')}</Button>
                        <Button onClick={terceiroTransicao1} primary color='green'>
                            {t('Próximo')} <Icon name='right chevron' />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    dimmer={"blurring"}
                    onClose={() => setTerceiroTreino2Open(false)}
                    open={terceiroTreino2Open}>
                    <Modal.Header>Pistol</Modal.Header>
                    <Modal.Content image>
                        <Image size='large' src="https://64.media.tumblr.com/0946f0fabb272f9ce2f8ce5d1093b163/tumblr_nxs8sv8QPv1ralbooo1_540.gifv" />
                        <Header>Realizar exercício Pistol durante 1 minuto e meio</Header>
                        <Modal.Description>
                            Tempo restante: {formatTime(time)}
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setTerceiroTreino2Open(false)}>{t('Cancelar')}</Button>
                        <Button primary color='green' onClick={terceiroTransicao2}>
                            {t('Próximo')} <Icon name='right chevron' />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    dimmer={'blurring'}
                    onClose={() => setTerceiroTreino3Open(false)}
                    open={terceiroTreino3Open}>
                    <Modal.Header>Bar muscle up</Modal.Header>
                    <Modal.Content image>
                        <Image size='large' src="https://c.tenor.com/m7wtaFY7CPwAAAAM/crossfit-muscleup.gif" />
                        <Header>Execução durante 4 minutos</Header>
                        <Modal.Description>
                            Tempo restante: {formatTime(time)}
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setTerceiroTreino3Open(false)}>{t('Cancelar')}</Button>
                        <Button primary color='green' onClick={finalizar3}>
                            {t('Próximo')} <Icon name='right chevron' />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    dimmer={'blurring'}
                    onClose={() => setFinal3Open(false)}
                    open={final3Open}
                    size='small'
                >
                    <Modal.Header>Treino Funcional III concluído com sucesso!</Modal.Header>
                    <Modal.Actions>
                        <Button
                            icon='check'
                            content='Finalizar'
                            color='green'
                            onClick={() => setFinal3Open(false)}
                        />
                    </Modal.Actions>
                </Modal> */}

                {/*Gráficos do usuário*/}

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
            <button className='aluno-home-btn' onClick={redirect}>Realizar treino</button>
        </div>
    )
}