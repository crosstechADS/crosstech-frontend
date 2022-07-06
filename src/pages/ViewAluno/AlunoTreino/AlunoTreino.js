import React, { useState, useEffect, useRef } from 'react';
import './AlunoTreino.css';
import { useTimer } from 'use-timer';
import formatTime from '../../../utils/formatTime.js'
import Api from '../../../config/Api';
import Loading from '../../../components/Loading';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header, Icon, Image, Input, Modal } from 'semantic-ui-react';
import { Field, Formik } from 'formik';
import { notify } from "react-notify-toast";
import { useTranslation } from 'react-i18next';
import { CgCornerDownLeft } from "react-icons/cg";

function AlunoTreinos({ email }) {

    let history = useHistory();

    const redirect = () => {
        history.push(`/alunohome`);
    }
    const { id } = useParams();

    const [treino, setTreino] = useState([]);
    const [exetre, setExetre] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);


    useEffect(() => {
        Api.get(`/exercicioTreinoSelect/${id}`)
            .then((response) => {
                setExetre(response.data);
            }).catch((err) => console.log);
        Api.get(`/treinoEspecifico/${id}`)
            .then((response) => {
                setTreino(response.data);
                setRemoveLoading(true);
            }).catch((err) => console.log);
    }, [])

    return (
        <div className='aluno-treino'>
            <Button size="large" className="btn-voltar" onClick={redirect}>Voltar<CgCornerDownLeft /></Button>
            {treino.map((data) => {
                return (
                    <div className='aluno-treino-detalhe'>
                        <h2>{data.DS_TREINO}</h2>
                        <p>{data.OBS_TREINO}</p>
                    </div>
                )
            })}
            {exetre.map((value) => {
                return (
                    <ExercicioTreino key={value.ID_EXERCICIO_TREINO}
                        exercicioTreino={value} />
                )
            })}
            {!removeLoading && <Loading />}
        </div>
    )
}

export default AlunoTreinos

function ExercicioTreino(props) {
    const { ID_EXERCICIO_TREINO, OBS_EXERCICIO_TREINO, ID_EXERCICIO, DS_EXERCICIO, DS_MIDIA_URL, NR_REPETICAO, KG_EXERCICIO, MINUTOS_EXERCICIO } = props.exercicioTreino;
    const { time, start, pause, reset, status, advanceTime } = useTimer({
        timerType: 'DECREMENTAL',
        initialTime: 60,
        endTime: 0
    });
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);
    const { t } = useTranslation();

    const realizarExercicio = () => {
        Api.post(`/AlunoTreinoRegister`, {
            NR_REPETICAO: NR_REPETICAO,
            KG_EXERCICIO: KG_EXERCICIO,
            ID_EXERCICIO_TREINO: ID_EXERCICIO_TREINO,
            MINUTOS_EXERCICIO: MINUTOS_EXERCICIO
        }).then((response) => {
            const isError = !response.data.msg.includes("sucesso");
            notify.show(response.data.msg, isError ? "error" : "success");
            if (isError) {
                //history.push(`/exercicio`);
            } else {
                setFirstOpen(false);
                setSecondOpen(true);
                //history.push(`/exercicios`);
            }
        })
        reset();

    }

    const cancelar = () => {
        setFirstOpen(false);
        reset();
    }

    const exercicioOpen = () => {
        const tempo = ((MINUTOS_EXERCICIO * 60) - 60);
        console.log(tempo)
        setFirstOpen(true);
        start();
        advanceTime(-(tempo));
    }

    return (
        <div className='aluno-treino-exercicio'>
            <img src={DS_MIDIA_URL} className='aluno-exercicio-img'></img>
            <h2><a href={`/exercicio/${ID_EXERCICIO}`}>{DS_EXERCICIO}</a></h2>
            <p>{OBS_EXERCICIO_TREINO}</p>
            <button className='aluno-home-btn' onClick={exercicioOpen}>Realizar exercício</button>
            <Modal
                dimmer={"blurring"}
                onClose={() => setFirstOpen(false)}
                onOpen={() => setFirstOpen(true)}
                open={firstOpen}>
                <Modal.Header>{DS_EXERCICIO}</Modal.Header>
                <Modal.Content image>
                    <Image size='large' src={DS_MIDIA_URL} />
                    <Header>{OBS_EXERCICIO_TREINO}</Header>
                    <Modal.Description>
                        <div>Tempo restante: {formatTime(time)}</div>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={cancelar}>{t('Cancelar')}</Button>
                    <Button onClick={realizarExercicio} primary color='green'>
                        {t('Próximo')} <Icon name='right chevron' />
                    </Button>
                </Modal.Actions>
            </Modal>
            <Modal
                dimmer={'blurring'}
                onClose={() => setSecondOpen(false)}
                open={secondOpen}
                size='small'
            >
                <Modal.Header>Exercício {DS_EXERCICIO} concluído com sucesso!</Modal.Header>
                <Modal.Actions>
                    <Button
                        icon='check'
                        content='Finalizar'
                        color='green'
                        onClick={() => setSecondOpen(false)}
                    />
                </Modal.Actions>
            </Modal>

        </div>
    )
}