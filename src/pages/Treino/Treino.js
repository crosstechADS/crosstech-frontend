import './Treino.css'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from "axios";
import Loading from '../../components/Loading';
import Container from '../../components/Container';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Button, TextArea, Select, Modal, Icon, Header, Dropdown} from "semantic-ui-react";
import { CgCornerDownLeft } from "react-icons/cg";
import { notify } from "react-notify-toast";
import * as yup from "yup";

function Treino({ perfil }) {
    const { id } = useParams();

    const history = useHistory();

    const routeChange = () => {
        history.push("/treinos");
    }

    const [removeLoading, setRemoveLoading] = useState(false);
    const [treino, setTreino] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [showTreinoForm, setShowTreinoForm] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            Axios.get(`${process.env.REACT_APP_BACKEND_URL}/alunosSelect`)
                .then((response) => {
                    setAlunos(response.data);
                }).catch((err) => console.log);
            Axios.get(`${process.env.REACT_APP_BACKEND_URL}/treinoEspecifico/${id}`)
                .then((response) => {
                    setTreino(response.data);
                    setRemoveLoading(true);
                })
                .catch((err) => console.log);
        }, 5000)
    }, [id]);

    const alunoOptions = alunos.map((value) => ({
        key: value.DS_NOME,
        text: value.DS_NOME,
        value: value.ID_USUARIO
    }));

    const [idTreino, setIdTreino] = useState("");
    const [nomeTreino, setNomeTreino] = useState("");
    const [obsTreino, setObsTreino] = useState("");
    const [aluno, setAluno] = useState("");
    const [dataInclusao, setDataInclusao] = useState("");


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

    function editTreino() {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateTreino`, {
            ID_TREINO: idTreino,
            DS_TREINO: nomeTreino,
            OBS_TREINO: obsTreino,
            DT_INCLUSAO: dataInclusao,
            ID_USUARIO: aluno
        }).then(async (response) => {
            const isError = !response.data.msg.includes("sucesso");
            notify.show(response.data.msg, isError ? "error" : "success");
            if (isError) {
                history.push(`/treino/${id}`);
            } else {
                history.push(`/treinos`);
            }
        })
    }

    function deleteTreino() {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/deleteTreino`, {
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

    const validationCadastro = yup.object().shape({
        treino: yup
            .string()
            .required("Campo Nome do Treino obrigatório")
    });


    return (
        <div>
            {treino.map((data) => {
                return (
                    <div className='treino'>
                        <Container customClass='column'>
                            <div className='treino-container'>
                                <h1>{data.DS_TREINO}</h1>
                                <Button size="large" className="btn-voltar" onClick={routeChange}>Voltar<CgCornerDownLeft /></Button>
                                {!showTreinoForm ? (
                                    <div className='treino-detalhes'>
                                        <p>
                                            <span>ID: </span>{data.ID_TREINO}
                                        </p>
                                        <p>
                                            <span>Nome: </span>{data.DS_TREINO}
                                        </p>
                                        <p>
                                            <span>Descrição: </span>{data.OBS_TREINO}
                                        </p>
                                        <p>
                                            <span>Treino atribuído a </span>{data.DS_NOME}
                                        </p>
                                        <p>
                                            <span>Data de inclusão: </span>{data.DT_INCLUSAO}
                                        </p>
                                    </div>
                                ) : (
                                    <div className='treino-detalhes'>
                                        <Formik initialValues={{}}
                                            validationSchema={validationCadastro}>
                                            <Form>
                                                <div className="update-form-group">
                                                    <label>Nome do Treino</label>

                                                    <Field required as={Input} size="large"
                                                        name="treino"
                                                        className="form-field"
                                                        placeholder="Nome do Treino"
                                                        onChange={(event) => setNomeTreino(event.target.value)}
                                                        value={nomeTreino} />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="treino"
                                                        className="form-error"
                                                    />
                                                </div>
                                                <div className="update-form-group">
                                                    <label>Descrição do Treino</label>
                                                    <Field required as={Input} size="large"
                                                        name="treinoObs"
                                                        className="form-field"
                                                        placeholder="Descrição do Treino"
                                                        onChange={(event) => setObsTreino(event.target.value)}
                                                        value={obsTreino} />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="treino"
                                                        className="form-error"
                                                    />
                                                </div>

                                                <label>Aluno</label>
                                                <div className="update-form-group">
                                                    <Dropdown
                                                        name="aluno"
                                                        value={aluno}
                                                        placeholder="Nome do Aluno"
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
                                                    <Button className="btn-update" size="large" onClick={editTreino}>Confirmar Edição</Button>
                                                    <Modal
                                                        closeIcon
                                                        open={open}
                                                        trigger={<Button size="large" className='btn-update'>Deletar</Button>}
                                                        onClose={() => setOpen(false)}
                                                        onOpen={() => setOpen(true)}
                                                    >
                                                        <Modal.Content>
                                                            <h4>Tem certeza que quer deletar esse treino?</h4>
                                                        </Modal.Content>
                                                        <Modal.Actions>
                                                            <Button onClick={() => setOpen(false)}>
                                                                <Icon name='remove' /> Cancelar
                                                            </Button>
                                                            <Button color='red' onClick={deleteTreino}>
                                                                <Icon name='checkmark' /> Deletar
                                                            </Button>
                                                        </Modal.Actions>
                                                    </Modal>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                )}
                                {perfil !== "aluno" &&
                                    <button onClick={toggleTreinoForm} className='btn'>
                                        {!showTreinoForm ? 'Editar Treino' : 'Fechar'}
                                    </button>}

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