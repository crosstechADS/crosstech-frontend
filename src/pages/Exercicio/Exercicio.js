import styles from './Exercicio.css'
import { useParams, useHistory} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from "axios";
import Loading from '../../components/Loading';
import Container from '../../components/Container';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Button, TextArea, Select } from "semantic-ui-react";
import { CgCornerDownLeft } from "react-icons/cg";
import { notify } from "react-notify-toast";
import * as yup from "yup";

function Exercicio() {
    const { id } = useParams();

    const history = useHistory();

    const routeChange = () => {
        history.push("/exercicios");
    }

    const routeMaintain = () => {
        history.push(`/exercicio/${id}`);
    }


    const [removeLoading, setRemoveLoading] = useState(false);
    const [exercicio, setExercicio] = useState([]);
    const [showExercicioForm, setShowExercicioForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            Axios.get(`${process.env.REACT_APP_BACKEND_URL}/exercicioEspecifico/${id}`)
                .then((response) => {
                    setExercicio(response.data);
                    setRemoveLoading(true);
                })
                .catch((err) => console.log);
        }, 5000)
    }, [id]);

    const [fileValue, setFileValue] = useState(null);
    const [idExercicio, setIdExercicio] = useState("");
    const [idMidia, setIdMidia] = useState("");
    const [nomeExercicio, setNomeExercicio] = useState("");
    const [obsExercicio, setObsExercicio] = useState("");
    const [tipoExercicio, setTipoExercicio] = useState("");
    const [dataInclusao, setDataInclusao] = useState("");
    

    function toggleExercicioForm() {
        setShowExercicioForm(!showExercicioForm);
        {exercicio.map((value) => {
            setIdExercicio(value.ID_EXERCICIO);
            setNomeExercicio(value.DS_EXERCICIO);
            setObsExercicio(value.OBS_EXERCICIO);
            setTipoExercicio(value.DS_TIPO_EXERCICIO);
            setFileValue(value.DS_MIDIA_URL);
            setDataInclusao(value.DT_INCLUSAO);
            setIdMidia(value.ID_MIDIA_EXERCICIO);
        })}
    }

    function editExercicio(){
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateExercicio`, {
            ID_EXERCICIO: idExercicio,
            DS_EXERCICIO: nomeExercicio,
            OBS_EXERCICIO: obsExercicio,
            exercicioTipo: tipoExercicio,
            DT_INCLUSAO: dataInclusao,
            ID_MIDIA_EXERCICIO: idMidia
        }).then(async (response) => {
            const isError = !response.data.msg.includes("sucesso");
            if (isError) {
                routeMaintain();                
            }else{
                routeChange();
                const idExercicio = response.data.record.id;
                const formData = new FormData();

                formData.append('file', fileValue, fileValue.name);

                await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/exerciciosregister/${idExercicio}/midia`, formData);
                
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
                        <Container customClass='column'>
                            <div className='exercicio-container'>
                                <h1>Exercício: {data.DS_EXERCICIO}</h1>
                                <button onClick={toggleExercicioForm} className='btn'>
                                    {!showExercicioForm ? 'Editar Exercicio' : 'Fechar'}
                                </button>
                                {!showExercicioForm ? (
                                    <div className='exercicio-detalhes'>
                                        <p>
                                            <span>ID: </span>{data.ID_EXERCICIO}
                                        </p>
                                        <p>
                                            <span>Nome: </span>{data.DS_EXERCICIO}
                                        </p>
                                        <p>
                                            <span>Descrição: </span>{data.OBS_EXERCICIO}
                                        </p>
                                        <p>
                                            <span>Data de inclusão: </span>{data.DT_INCLUSAO}
                                        </p>
                                    </div>
                                ) : (
                                    <div className='exercicio-detalhes'>
                                        <Formik initialValues={{}}
                                        validationSchema={validationCadastro}>
                                            <Form>
                                                <div className="edit-input">
                                                    <label>Nome do Exercício</label>

                                                    <Field required as={Input} size="large"
                                                        name="exercicio"
                                                        className="form-field"
                                                        placeholder="Nome do Exercício"
                                                        onChange = {(event) => setNomeExercicio(event.target.value)}
                                                        value={nomeExercicio} />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="exercicio"
                                                        className="form-error"
                                                    />
                                                </div>
                                                <div className="edit-input">
                                                    <label>Descrição do Exercício</label>
                                                    <Field required as={Input} size="large"
                                                        name="exercicioObs"
                                                        className="form-field"
                                                        placeholder="Descrição do Exercício"
                                                        onChange = {(event) => setObsExercicio(event.target.value)}
                                                        value={obsExercicio}  />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="exercicio"
                                                        className="form-error"
                                                    />
                                                </div>

                                                <label>Tipo do Exercício</label>
                                                <div className="login-form-group">
                                                    <Field as={Input} size="large"
                                                        name="exercicioTipo"
                                                        className="form-field"
                                                        placeholder="Tipo de exercício"
                                                        onChange = {(event) => setTipoExercicio(event.target.value)}
                                                        value={tipoExercicio} />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="exercicioTipo"
                                                        className="form-error"
                                                    />
                                                </div>

                                                <label>Mídia do Exercício</label>
                                                <div className="login-form-group">
                                                    <input id="file" name="file" type="file" onChange={(event) => {
                                                        setFileValue(event.currentTarget.files[0]);
                                                    }} />
                                                </div>

                                                <Button className="btn-login" size="large" onClick={editExercicio}>Confirmar Edição</Button>                                                    
                                            </Form>
                                        </Formik>
                                    </div>
                                )}
                                <Button size="large" className="btn-voltar" onClick={routeChange}>Voltar<CgCornerDownLeft /></Button>
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