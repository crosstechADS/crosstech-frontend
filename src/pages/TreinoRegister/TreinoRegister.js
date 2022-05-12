import "./TreinoRegister.css";
import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { Input, Button, Dropdown } from "semantic-ui-react";
import { notify } from "react-notify-toast";
import { Redirect } from "react-router";
import TreinoAuthentication from "../TreinoAuthentication/TreinoAuthentication";
import { Link, useHistory } from "react-router-dom";
import { CgCornerDownLeft } from "react-icons/cg";


function TreinoRegister() {
    const history = useHistory();

    const routeChange = () =>{
        let path = `/treino`;
        history.push(path);
    } 

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/alunosSelect`)
        .then((response) => {
            setAlunos(response.data);
        })
    }, []);

    const [alunos, setAlunos] = useState([]);

    const [aluno, setAluno] = useState("");

    const alunoOptions = []

    //ação do botao cadastrar
    const handleClickRegister = (values) => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/treinoregister`, {
            treino: values.treino,
            treinoObs: values.treinoObs,
            email: values.email

        }).then((Response) => {
            const isError = !Response.data.msg.includes("sucesso");
            notify.show(Response.data.msg, isError ? "error" : "success");
            if (isError) {
                history.push("/treinoregister");
            }
            else {
                history.push("/treino");
            }
        });
    };

    //faz a validação dos campos do cadastro
    const validationCadastro = yup.object().shape({
        treino: yup
            .string()
            .required("Campo Nome do Treino obrigatório")
    });

    return <TreinoAuthentication>
        <h1>Cadastro de Treino</h1>
        <Formik initialValues={{}}
            onSubmit={handleClickRegister}
            validationSchema={validationCadastro}>
            <Form className="login-form">

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="treino"
                        className="form-field"
                        placeholder="Nome do Treino" />
                    <ErrorMessage
                        component="span"
                        name="treino"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="treinoObs"
                        className="form-field"
                        placeholder="Observação Adicional" />
                    <ErrorMessage
                        component="span"
                        name="treinoObs"
                        className="form-error"
                    />
                </div>

                <Dropdown 
                    name="aluno" 
                    value={aluno} 
                    placeholder="Alunos" 
                    search
                    selection
                    options={alunoOptions} 
                    onChange={(e, data) => setAluno(data.value)} />

                <Button className="btn-login" size="large" primary type="submit">Cadastrar Treino</Button>
                <Button size="large" className="btn-voltar" onClick={routeChange}>Voltar<CgCornerDownLeft/></Button>
            </Form>

        </Formik>
    </TreinoAuthentication>
}

export default TreinoRegister;
