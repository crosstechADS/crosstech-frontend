import "./TreinoRegister.css";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { Input, Button } from "semantic-ui-react";
import { notify } from "react-notify-toast";
import { Redirect } from "react-router";
import TreinoAuthentication from "../TreinoAuthentication/TreinoAuthentication";

function TreinoRegister() {
    //ação do botao cadastrar
    const handleClickRegister = (values) => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/treinoregister`, {
            treino: values.treino,
            treinoObs: values.treinoObs

        }).then((Response) => {
            const isError = !Response.data.msg.includes("sucesso");
            notify.show(Response.data.msg, isError ? "error" : "success");
            // notify.show(Response.data.msg)
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

                <Button className="btn-login" size="large" primary type="submit">Cadastrar Treino</Button>
            </Form>

        </Formik>
    </TreinoAuthentication>
}

export default TreinoRegister;
