import './Treino.css'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Api from '../../config/Api';
import Loading from '../../components/Loading';
import Container from '../../components/Container';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Button, TextArea, Select, Modal, Icon, Header, Dropdown } from "semantic-ui-react";
import { CgCornerDownLeft } from "react-icons/cg";
import { notify } from "react-notify-toast";
import ExerciciosItem from "../../components/ExerciciosItem";
import * as yup from "yup";
import { useTranslation } from 'react-i18next';


function Treino({ perfil }) {
    const { id } = useParams();

    const history = useHistory();
    const { t } = useTranslation();

    const routeChange = () => {
        history.push("/treinos");
    }

    const [removeLoading, setRemoveLoading] = useState(false);
    const [treino, setTreino] = useState([]);
    const [exetre, setExetre] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [exercicios, setExercicios] = useState([]);
    const [showTreinoForm, setShowTreinoForm] = useState(false);
    const [showExercicioForm, setShowExercicioForm] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            Api.get(`/alunosSelect`)
                .then((response) => {
                    setAlunos(response.data);
                }).catch((err) => console.log);
            Api.get(`/exercicioSelect`)
                .then((response) => {
                    setExercicios(response.data);
                }).catch((err) => console.log);
                Api.get(`/exercicioTreinoSelect/${id}`)
                .then((response) => {
                    setExetre(response.data);
                }).catch((err) => console.log);
            Api.get(`/treinoEspecifico/${id}`)
                .then((response) => {
                    setTreino(response.data);
                    setRemoveLoading(true);
                })
                .catch((err) => console.log);
        }, 5000)
    }, []);

    const alunoOptions = alunos.map((value) => ({
        key: value.DS_NOME,
        text: value.DS_NOME,
        value: value.ID_USUARIO
    }));

    const exercicioOptions = exercicios.map((value) => ({
        key: value.DS_EXERCICIO,
        text: value.DS_EXERCICIO,
        value: value.ID_EXERCICIO
    }));

    //variaveis de treino
    const [idTreino, setIdTreino] = useState("");
    const [nomeTreino, setNomeTreino] = useState("");
    const [obsTreino, setObsTreino] = useState("");
    const [aluno, setAluno] = useState("");
    const [dataInclusao, setDataInclusao] = useState("");

    //variaveis de treino_exercicio
    const [descTreino, setDescTreino] = useState("");
    const [exercicio, setExercicio] = useState("");


    function toggleTreinoForm() {
        setShowTreinoForm(!showTreinoForm);
        {
            treino.map((value) => {
                setIdTreino(value.ID_TREINO);
                setNomeTreino(value.DS_TREINO);
                setObsTreino(value.OBS_TREINO);
                setDataInclusao(value.DT_INCLUSAO);
                setAluno(value.ID_USUARIO);
            })
        }
    }

    function toggleExercicioForm() {
        setShowExercicioForm(!showExercicioForm);
        {
            treino.map((value) => {
                setIdTreino(value.ID_TREINO);
            })
        }
    }

    function editTreino() {
        Api.post(`/updateTreino`, {
            ID_TREINO: idTreino,
            DS_TREINO: nomeTreino,
            OBS_TREINO: obsTreino,
            DT_INCLUSAO: dataInclusao,
            ID_USUARIO: aluno
        }).then(async (response) => {
            setShowTreinoForm(!showTreinoForm);
            const isError = !response.data.msg.includes("sucesso");
            notify.show(response.data.msg, isError ? "error" : "success");
            if (isError) {
                history.push(`/treino/${id}`);
            }
        })
    }

    function deleteTreino() {
        Api.post(`/deleteTreino`, {
            ID_TREINO: idTreino,
            DS_TREINO: nomeTreino,
            OBS_TREINO: obsTreino,
            DT_INCLUSAO: dataInclusao,
            ID_USUARIO: aluno
        }).then((response) => {
            const isError = !response.data.msg.includes("sucesso");
            notify.show(response.data.msg, isError ? "error" : "success");
            if (isError) {
                setOpen(false);
                history.push(`/treino/${id}`);
            } else {
                setOpen(false);
                history.push(`/treinos`);
            }
        })
    }

    function addExercicio(){
        Api.post(`/exercicioTreinoRegister`, {
            OBS_EXERCICIO_TREINO: descTreino,
            ID_TREINO: idTreino,
            ID_EXERCICIO: exercicio,
        }).then((response) => {
            const isError = !response.data.msg.includes("sucesso");
            notify.show(response.data.msg, isError ? "error" : "success");
            if (isError) {
                history.push(`/treino/${id}`);
            }
        });
    }

    const validationCadastro = yup.object().shape({
        treino: yup
            .string()
            .required(t("Campo Nome do Treino obrigatório"))
    });


    return (
        <div>
            {treino.map((data) => {
                return (
                    <div className='treino'>
                        <Button size="large" className="btn-voltar" onClick={routeChange}>{t('Voltar')}<CgCornerDownLeft /></Button>
                        <Container customClass='column'>
                            <div className='treino-container'>
                                <h1>{data.DS_TREINO}</h1>
                                {perfil !== "aluno" &&
                                    <button onClick={toggleTreinoForm} className='btn'>
                                        {!showTreinoForm ? t('Editar Treino') : t('Fechar')}
                                    </button>}
                                {!showTreinoForm ? (
                                    <div className='treino-detalhes'>
                                        <p>
                                            <span>ID: </span>{data.ID_TREINO}
                                        </p>
                                        <p>
                                            <span>{t('Nome')}: </span>{data.DS_TREINO}
                                        </p>
                                        <p>
                                            <span>{t('Descrição')}: </span>{data.OBS_TREINO}
                                        </p>
                                        <p>
                                            <span>{t('Treino atribuído a')} </span>{data.DS_NOME}
                                        </p>
                                        <p>
                                            <span>{t('Data de inclusão')}: </span>{data.DT_INCLUSAO}
                                        </p>
                                    </div>
                                ) : (
                                    <div className='treino-detalhes'>
                                        <Formik initialValues={{}}
                                            validationSchema={validationCadastro}>
                                            <Form>
                                                <div className="update-form-group">
                                                    <label>{t('Nome do Treino')}</label>

                                                    <Field required as={Input} size="large"
                                                        name="treino"
                                                        className="form-field"
                                                        placeholder={t("Nome do Treino")}
                                                        onChange={(event) => setNomeTreino(event.target.value)}
                                                        value={nomeTreino} />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="treino"
                                                        className="form-error"
                                                    />
                                                </div>
                                                <div className="update-form-group">
                                                    <label>{t('Descrição do Treino')}</label>
                                                    <Field required as={Input} size="large"
                                                        name="treinoObs"
                                                        className="form-field"
                                                        placeholder={t("Descrição do Treino")}
                                                        onChange={(event) => setObsTreino(event.target.value)}
                                                        value={obsTreino} />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="treino"
                                                        className="form-error"
                                                    />
                                                </div>

                                                <label>{t('Aluno')}</label>
                                                <div className="update-form-group">
                                                    <Dropdown
                                                        name="aluno"
                                                        value={aluno}
                                                        placeholder={t("Nome do Aluno")}
                                                        search
                                                        selection
                                                        options={alunoOptions}
                                                        onChange={(e, data) => setAluno(data.value)} />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="aluno"
                                                        className="form-error"
                                                    />
                                                </div>

                                                <div className='update-form-actions'>
                                                    <Button className="btn-update" size="large" onClick={editTreino}>{t('Confirmar Edição')}</Button>
                                                    <Modal
                                                        closeIcon
                                                        open={open}
                                                        trigger={<Button size="large" className='btn-update'>{t('Deletar')}</Button>}
                                                        onClose={() => setOpen(false)}
                                                        onOpen={() => setOpen(true)}
                                                    >
                                                        <Modal.Content>
                                                            <h4>{t('Tem certeza que quer deletar esse treino?')}</h4>
                                                        </Modal.Content>
                                                        <Modal.Actions>
                                                            <Button onClick={() => setOpen(false)}>
                                                                <Icon name='remove' /> {t('Cancelar')}
                                                            </Button>
                                                            <Button color='red' onClick={deleteTreino}>
                                                                <Icon name='checkmark' /> {t('Deletar')}
                                                            </Button>
                                                        </Modal.Actions>
                                                    </Modal>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                )}

                            </div>
                            <div className='exercicio-container'>
                                <h1>{t('Exercícios')}</h1>
                                {perfil !== "aluno" &&
                                    <button onClick={toggleExercicioForm} className='btn'>
                                        {!showExercicioForm ? 'Adicionar exercício' : 'Fechar'}
                                    </button>}
                                <div className='exercicio-detalhes'>
                                    {!showExercicioForm ? (
                                        <div className='treino-detalhes'>
                                            {exetre.map((data) => {
                                                return(
                                                    <div>
                                                        <h3>{data.OBS_EXERCICIO_TREINO}</h3>
                                                        <ExerciciosItem key={data.ID_EXERCICIO}
                                                        listCard={exercicios} setListCard={setExercicios}
                                                        exercicio={data} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <div className='treino-detalhes'>
                                            <Formik initialValues={{}}
                                                validationSchema={validationCadastro}>
                                                <Form>
                                                    <div className="update-form-group">
                                                        <label>{t('Descrição do Exercício')}</label>

                                                        <Field required as={Input} size="large"
                                                            name="descTreino"
                                                            className="form-field"
                                                            placeholder={t("Descrição do Exercício")}
                                                            onChange={(event) => setDescTreino(event.target.value)}
                                                            value={descTreino} />
                                                    </div>

                                                    <label>{t('Exercício')}</label>
                                                    <div className="update-form-group">
                                                        <Dropdown
                                                            name="exercicio"
                                                            value={exercicio}
                                                            placeholder={t("Exercicio")}
                                                            search
                                                            selection
                                                            options={exercicioOptions}
                                                            onChange={(e, data) => setExercicio(data.value)} />
                                                        <ErrorMessage
                                                            component="span"
                                                            name="exercicio"
                                                            className="form-error"
                                                        />
                                                    </div>

                                                    <div className='update-form-actions'>
                                                        <Button className="btn-update" size="large" onClick={addExercicio}>{t('Confirmar Adição')}</Button>
                                                    </div>
                                                </Form>
                                            </Formik>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Container>
                    </div>
                )
            })}
            {!removeLoading && <Loading />}
        </div>
    )
}

export default Treino