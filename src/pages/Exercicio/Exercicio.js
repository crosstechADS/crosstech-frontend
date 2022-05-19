import styles from './Exercicio.css'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from "axios";
import Loading from '../../components/Loading';
import Container from '../../components/Container';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Button, TextArea, Select, Modal, Icon, Header, Dropdown } from "semantic-ui-react";
import { CgCornerDownLeft } from "react-icons/cg";
import { notify } from "react-notify-toast";
import * as yup from "yup";

function Exercicio({ perfil }) {
    const { id } = useParams();

    const history = useHistory();

    const routeChange = () => {
        history.push("/exercicios");
    }

    const [removeLoading, setRemoveLoading] = useState(false);
    const [exercicio, setExercicio] = useState([]);
    const [tiposExercicio, setTiposExercicio] = useState([]);
    const [showExercicioForm, setShowExercicioForm] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            Axios.get(`${process.env.REACT_APP_BACKEND_URL}/exercicioEspecifico/${id}`)
                .then((response) => {
                    setExercicio(response.data);
                    setRemoveLoading(true);
                })
                .catch((err) => console.log);
            Axios.get(`${process.env.REACT_APP_BACKEND_URL}/selectTipoExercicio`)
                .then((response) => {
                    setTiposExercicio(response.data);
                })
                .catch((err) => console.log);
        }, 5000)
    }, [id]);//

    const tipoOptions = tiposExercicio.map((value) => ({
        key: value.DS_TIPO_EXERCICIO,
        text: value.DS_TIPO_EXERCICIO,
        value: value.ID_TIPO_EXERCICIO
    }));

    const [fileValue, setFileValue] = useState(null);
    const [idExercicio, setIdExercicio] = useState("");
    const [idMidia, setIdMidia] = useState("");
    const [nomeExercicio, setNomeExercicio] = useState("");
    const [obsExercicio, setObsExercicio] = useState("");
    const [tipoExercicio, setTipoExercicio] = useState('');
    const [dataInclusao, setDataInclusao] = useState("");


    function toggleExercicioForm() {
        setShowExercicioForm(!showExercicioForm);
        {
            exercicio.map((value) => {
                setIdExercicio(value.ID_EXERCICIO);
                setNomeExercicio(value.DS_EXERCICIO);
                setObsExercicio(value.OBS_EXERCICIO);
                setTipoExercicio(value.ID_TIPO_EXERCICIO);
                setFileValue(value.DS_MIDIA_URL);
                setDataInclusao(value.DT_INCLUSAO);
                setIdMidia(value.ID_MIDIA_EXERCICIO);
            })
        }
    }

    function editExercicio() {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateExercicio`, {
            ID_EXERCICIO: idExercicio,
            DS_EXERCICIO: nomeExercicio,
            OBS_EXERCICIO: obsExercicio,
            exercicioTipo: tipoExercicio,
            DT_INCLUSAO: dataInclusao,
            ID_MIDIA_EXERCICIO: idMidia
        }).then(async (response) => {
            setShowExercicioForm(!showExercicioForm);
            const isError = !response.data.msg.includes("sucesso");
            notify.show(response.data.msg, isError ? "error" : "success");
            if (isError) {
                history.push(`/exercicio/${id}`);
            } else {
                const idExercicio = response.data.record.id;
                const formData = new FormData();

                formData.append('file', fileValue, fileValue.name);

                await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/exerciciosregister/${idExercicio}/midia`, formData);
            }
        })
    }

    function deleteExercicio() {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/exercicioDelete`, {
            ID_EXERCICIO: idExercicio,
            DS_EXERCICIO: nomeExercicio,
            OBS_EXERCICIO: obsExercicio,
            exercicioTipo: tipoExercicio,
            DT_INCLUSAO: dataInclusao,
            ID_MIDIA_EXERCICIO: idMidia
        }).then((response) => {
            const isError = !response.data.msg.includes("sucesso");
            notify.show(response.data.msg, isError ? "error" : "success");
            if (isError) {
                setOpen(false);
                history.push(`/exercicio/${id}`);
            } else {
                setOpen(false);
                history.push(`/exercicios`);
            }
        })
    }

    const validationCadastro = yup.object().shape({
        exercicio: yup
            .string()
            .required("Campo Nome do Exercicio obrigatório")
    });


    return (
        <div>
            {exercicio.map((data) => {
                return (
                    <div className='exercicio'>
                        <Button size="large" className="btn-voltar" onClick={routeChange}>Voltar<CgCornerDownLeft /></Button>
                        <Container customClass='column'>
                            <div className='exercicio-container'>
                                <h1>Exercício: {data.DS_EXERCICIO}</h1>
                                {perfil !== "aluno" &&
                                    <button onClick={toggleExercicioForm} className='btn'>
                                        {!showExercicioForm ? 'Editar Exercicio' : 'Fechar'}
                                    </button>}
                                {!showExercicioForm ? (
                                    <div className='exercicio-detalhes'>
                                        <img className='exercicio-midia' src={data.DS_MIDIA_URL}></img>
                                        <p>
                                            <span>ID: </span>{data.ID_EXERCICIO}
                                        </p>
                                        <p>
                                            <span>Nome: </span>{data.DS_EXERCICIO}
                                        </p>
                                        <p>
                                            <span>Descrição: </span>{data.OBS_EXERCICIO}
                                        </p>
                                    </div>
                                ) : (
                                    <div className='exercicio-detalhes'>
                                        <Formik initialValues={{}}
                                            validationSchema={validationCadastro}>
                                            <Form>
                                                <div className="update-form-group">
                                                    <label>Nome do Exercício</label>

                                                    <Field required as={Input} size="large"
                                                        name="exercicio"
                                                        className="form-field"
                                                        placeholder="Nome do Exercício"
                                                        onChange={(event) => setNomeExercicio(event.target.value)}
                                                        value={nomeExercicio} />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="exercicio"
                                                        className="form-error"
                                                    />
                                                </div>
                                                <div className="update-form-group">
                                                    <label>Descrição do Exercício</label>
                                                    <Field required as={Input} size="large"
                                                        name="exercicioObs"
                                                        className="form-field"
                                                        placeholder="Descrição do Exercício"
                                                        onChange={(event) => setObsExercicio(event.target.value)}
                                                        value={obsExercicio} />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="exercicio"
                                                        className="form-error"
                                                    />
                                                </div>

                                                <label>Tipo do Exercício</label>
                                                <div className="update-form-group">
                                                    <Dropdown
                                                        name="exercicioTipo"
                                                        value={tipoExercicio}
                                                        placeholder="Tipo de exercício"
                                                        search
                                                        selection
                                                        options={tipoOptions}
                                                        onChange={(e, data) => setTipoExercicio(data.value)} />
                                                </div>

                                                <label>Mídia do Exercício</label>
                                                <div className="update-form-group">
                                                    <input id="file" name="file" type="file" onChange={(event) => {
                                                        setFileValue(event.currentTarget.files[0]);
                                                    }} />
                                                </div>

                                                <div className='update-form-actions'>
                                                    <Button className="btn-update" size="large" onClick={editExercicio}>Confirmar Edição</Button>
                                                    <Modal
                                                        closeIcon
                                                        open={open}
                                                        trigger={<Button size="large" className='btn-update'>Deletar</Button>}
                                                        onClose={() => setOpen(false)}
                                                        onOpen={() => setOpen(true)}
                                                    >
                                                        <Modal.Content>
                                                            <h4>Tem certeza que quer deletar esse exercício?</h4>
                                                        </Modal.Content>
                                                        <Modal.Actions>
                                                            <Button onClick={() => setOpen(false)}>
                                                                <Icon name='remove' /> Cancelar
                                                            </Button>
                                                            <Button color='red' onClick={deleteExercicio}>
                                                                <Icon name='checkmark' /> Deletar
                                                            </Button>
                                                        </Modal.Actions>
                                                    </Modal>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                )}
                            </div>
                        </Container>

                    </div>
                )
            })}
            {!removeLoading && <Loading />}
        </div>
    )
}

export default Exercicio