import React, { useState, useEffect, useRef } from 'react';
import './AlunoTreino.css';
import useTimer from '../../../hooks/useTimer';
import formatTime from '../../../utils/formatTime.js'
import Api from '../../../config/Api';
import Loading from '../../../components/Loading';
import { useParams } from 'react-router-dom';
import { Button, Form, Header, Icon, Image, Input, Modal } from 'semantic-ui-react';
import { Field, Formik } from 'formik';
import { notify } from "react-notify-toast";
import { useTranslation } from 'react-i18next';

function AlunoTreinos({ email }) {
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
    const { ID_EXERCICIO_TREINO, OBS_EXERCICIO_TREINO, ID_EXERCICIO, DS_EXERCICIO, DS_MIDIA_URL } = props.exercicioTreino;
    const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);
    const [nrRepeticao, setNrRepeticao] = useState('');
    const [peso, setPeso] = useState('');
    const { t } = useTranslation();

    const realizarExercicio = () => {
        Api.post(`/AlunoTreinoRegister`, {
            NR_REPETICAO: nrRepeticao,
            KG_EXERCICIO: peso,
            ID_EXERCICIO_TREINO: ID_EXERCICIO_TREINO,
            MINUTOS_EXERCICIO: timer
        }).then((response) => {
            const isError = !response.data.msg.includes("sucesso");
            notify.show(response.data.msg, isError ? "error" : "success");
            if (isError) {
                //history.push(`/exercicio`);
            } else {
                setSecondOpen(false);
                setFirstOpen(false);
                //history.push(`/exercicios`);
            }
        })

    }

    return (
        <div className='aluno-treino-exercicio'>
            <img src={DS_MIDIA_URL} className='aluno-exercicio-img'></img>
            <h2><a href={`/exercicio/${ID_EXERCICIO}`}>{DS_EXERCICIO}</a></h2>
            <p>{OBS_EXERCICIO_TREINO}</p>
            <Modal
                onClose={() => setFirstOpen(false)}
                onOpen={() => setFirstOpen(true)}
                open={firstOpen}
                trigger={<Button color='black'>{t('Realizar exercício')}</Button>}>
                <Modal.Header>{DS_EXERCICIO}</Modal.Header>
                <Modal.Content image>
                    <Image size='large' src={DS_MIDIA_URL} />
                    <Header>{OBS_EXERCICIO_TREINO}</Header>
                    <Modal.Description>
                        <div className='stopwatch'>
                            <h3>{t('Cronômetro')}</h3>
                            <div className='stopwatch-card'>
                                <p>{formatTime(timer)}</p>
                                <div className='buttons'>
                                    {
                                        !isActive && !isPaused ?
                                            <button onClick={handleStart}>{t('Começar')}</button>
                                            : (
                                                isPaused ? <button onClick={handlePause}>{t('Parar')}</button>
                                                    : <button onClick={handleResume}>{t('Resumir')}</button>
                                            )
                                    }
                                    <button onClick={handleReset} disabled={!isActive}>{t('Resetar')}</button>
                                </div>
                            </div>
                        </div>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setFirstOpen(false)}>{t('Cancelar')}</Button>
                    <Button onClick={() => setSecondOpen(true)} primary color='green'>
                        {t('Continuar')} <Icon name='right chevron' />
                    </Button>
                </Modal.Actions>
                <Modal
                    onClose={() => setSecondOpen(false)}
                    open={secondOpen}>
                    <Modal.Header>{DS_EXERCICIO}</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Formik initialValues={{}}>
                                <Form>
                                    <div className='aluno-exercicio-form'>
                                        <label>{t('Número de repetições')}</label>
                                        <Field as={Input} size='large'
                                            name='repeticoes'
                                            className='form-field'
                                            placeholder={t('Número de repetições')}
                                            onChange={(event) => setNrRepeticao(event.target.value)}
                                            value={nrRepeticao} />
                                    </div>
                                    <div className='aluno-exercicio-form'>
                                        <label>{t('Peso utilizado')}</label>
                                        <Field as={Input} size='large'
                                            name='pesagem'
                                            className='form-field'
                                            placeholder={t('Peso utilizado')}
                                            onChange={(event) => setPeso(event.target.value)}
                                            value={peso} />
                                    </div>
                                </Form>
                            </Formik>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setSecondOpen(false)}>{t('Cancelar')}</Button>
                        <Button onClick={realizarExercicio} primary color='green'>
                            {t('Finalizar')} <Icon name='right chevron' />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Modal>
        </div>
    )
}