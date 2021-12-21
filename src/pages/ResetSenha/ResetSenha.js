import "./ResetSenha.css"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import logo from '../../logo.png';
import Authentication from '../Authentication';
import { Input, Button } from "semantic-ui-react";
import { notify } from 'react-notify-toast';
import { Link, useHistory } from "react-router-dom";
import { CgCornerDownLeft } from "react-icons/cg";




function ResetSenha() {

    const history = useHistory();

    const routeChange = () =>{ 
        let path = `/login`;
        history.push(path);
    } 

    //ação do botão mudar senha
    const handleClickReset = (values) => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/resetSenha`, {
            email: values.email,
            password: values.password
        }).then((Response) => {
            const isError = !Response.data.msg.includes("sucesso");
            if (isError) {
                history.push("/resetsenha");
            }
            else {
                history.push("/login");
            }})
        }

    //utilizando o yup para fazer a validação dos campos email e senha (min 8 caracteres), ambos preenchimento obrigatório
    const validationSenha = yup.object().shape({
        email: yup
            .string()
            .email("Formato inválido.")
            .required("Campo E-mail obrigatório"),
        password: yup
            .string()
            .min(8, "Formato de senha inválido")
            .required("Campo Senha obrigatório."),
    });



    return (
        <Authentication>
            <h1>Mudança de Senha</h1>
            <Formik initialValues={{}}
                onSubmit={handleClickReset}
                validationSchema={validationSenha}>
                <Form className="login-form">
                <div className="login-form-group">
                        <Field as={Input} size="large" name="email" className="form-field" placeholder="E-mail" />
                        <ErrorMessage
                            component="span"
                            name="email"
                            className="form-error"
                        />
                    </div>
                    <div className="login-form-group">
                        <Field as={Input} size="large" name="password" type="password" className="form-field" placeholder="Senha" />
                        <ErrorMessage
                            component="span"
                            name="password"
                            className="form-error"
                        />
                    </div>
                    <Button className="btn-senha" size="large" primary type="submit">Mudar Senha</Button>
                    <Button size="large" className="btn-voltar" onClick={routeChange}>Voltar<CgCornerDownLeft/></Button>
                </Form>
            </Formik>

        </Authentication>

    );

    }
export default ResetSenha;