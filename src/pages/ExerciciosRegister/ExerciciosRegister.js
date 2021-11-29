import "./ExerciciosRegister.css";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { Input, Button, TextArea, Select} from "semantic-ui-react";
import { notify } from "react-notify-toast";
import { Redirect } from "react-router";
import ExerciciosAuthentication from "../ExerciciosAuthentication/ExerciciosAuthentication";



function ExerciciosRegister() {
    //ação do botao cadastrar
    const handleClickRegister = (values) => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/exerciciosregister`, {
            exercicio: values.exercicio,
            exercicioObs: values.exercicioObs,
            exercicioTipo: values.exercicioTipo

        }).then((Response) => {
            const isError = !Response.data.msg.includes("sucesso");
            notify.show(Response.data.msg, isError ? "error" : "success");
            // notify.show(Response.data.msg)
        });
    };

    //faz a validação dos campos do cadastro
    const validationCadastro = yup.object().shape({
        exercicio: yup
            .string()
            .required("Campo Nome do Exercicio obrigatório")
    });

    const options = [
        { key: 'a', text: 'Aerobica', value: 'aerobica' },
        { key: 'f', text: 'Funcional', value: 'funcional' },
        { key: 'p', text: 'Pilates', value: 'pilates' },
      ]

    return <ExerciciosAuthentication>
        <h1>Cadastro de Exercício</h1>
        <Formik initialValues={{}}
            onSubmit={handleClickRegister}
            validationSchema={validationCadastro}>
            <Form className="login-form">

                <div className="login-form-group">
                    <Field required as={Input} size="large"
                        name="exercicio"
                        className="form-field"
                        placeholder="Nome do Exercício" />
                    <ErrorMessage
                        component="span"
                        name="exercicio"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="exercicioObs"
                        className="form-field"
                        placeholder="Observação Adicional" />
                    <ErrorMessage
                        component="span"
                        name="exercicioObs"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Select} size="large"
                        name="exercicioTipo"
                        className="form-field"
                        placeholder="Tipo de exercício"
                        options = {options} />
                    <ErrorMessage
                        component="span"
                        name="exercicioTipo"
                        className="form-error"
                    />
                </div>

                <Button className="btn-login" size="large" primary type="submit">Cadastrar Exercício</Button>
            </Form>

        </Formik>
    </ExerciciosAuthentication>
}

export default ExerciciosRegister;
