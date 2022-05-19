import "./ExerciciosRegister.css";
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Api from '../../config/Api';
import { Input, Button, TextArea, Dropdown } from "semantic-ui-react";
import { notify } from "react-notify-toast";
import { Redirect } from "react-router";
import ExerciciosAuthentication from "../ExerciciosAuthentication/ExerciciosAuthentication";
import { Link, useHistory } from "react-router-dom";
import { CgCornerDownLeft } from "react-icons/cg";


function ExerciciosRegister() {
    const history = useHistory();
    const [fileValue, setFileValue] = useState(null);
    const [tipoExercicio, setTipoExercicio] = useState([]);
    const [tipo, setTipo] = useState('');

    useEffect(() => {
        Api.get(`/selectTipoExercicio`)
        .then((response) => {
            setTipoExercicio(response.data);
        })
    }, []);

    const exercicioOptions = tipoExercicio.map((value) => ({
        key: value.DS_TIPO_EXERCICIO,
        text: value.DS_TIPO_EXERCICIO,
        value: value.ID_TIPO_EXERCICIO
    }));

    const routeChange = () => {
        let path = `/exercicios`;
        history.push(path);
    }

    //ação do botao cadastrar
    const handleClickRegister = (values) => {
        Api.post(`/exerciciosregister`, {
            exercicio: values.exercicio,
            exercicioObs: values.exercicioObs,
            exercicioTipo: tipo

        }).then(async (response) => {
            const isError = !response.data.msg.includes("sucesso");
            console.log(tipo)
            console.log(isError);
            console.log('file: ', fileValue)
            notify.show(response.data.msg, isError ? "error" : "success");
            if (isError) {
                history.push("/exerciciosregister");
            }
            else {
                const idExercicio = response.data.record.id;
                const formData = new FormData();

                formData.append('file', fileValue, fileValue.name)

                await Api.post(`/exerciciosregister/${idExercicio}/midia`, formData)
                history.push("/exercicios");
            }
        });
    };

    //faz a validação dos campos do cadastro
    const validationCadastro = yup.object().shape({
        exercicio: yup
            .string()
            .required("Campo Nome do Exercicio obrigatório")
    });

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

                <Dropdown 
                    name="exercicioTipo" 
                    value={tipo} 
                    placeholder="Tipo de exercício" 
                    search
                    selection
                    options={exercicioOptions} 
                    onChange={(e, data) => setTipo(data.value)} />

                <div className="login-form-group">
                    <input id="file" name="file" type="file" onChange={(event) => {
                        setFileValue(event.currentTarget.files[0]);
                    }} />
                </div>

                <Button className="btn-login" size="large" primary type="submit">Cadastrar Exercício</Button>
                <Button size="large" className="btn-voltar" onClick={routeChange}>Voltar<CgCornerDownLeft /></Button>
            </Form>

        </Formik>
    </ExerciciosAuthentication>
}

export default ExerciciosRegister;
