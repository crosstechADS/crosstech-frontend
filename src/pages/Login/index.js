import "./index.css"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Api from '../../config/Api';
import logo from '../../logo.png';
import Authentication from '../Authentication';
import { Input, Button } from "semantic-ui-react";
import { notify } from 'react-notify-toast';
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { useTranslation } from 'react-i18next';


function Login() {

    const history = useHistory();
    const { t } = useTranslation();

    //ação do botão login
    const handleClickLogin = (values) => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            nome: values.nome,
            email: values.email,
            password: values.password
        }).then((Response) => {
            const isError = !Response.data.msg.includes("sucesso");
            if (isError) {
                history.push("/login");
            }
            else {
                console.log('token: ', Response.data)
                const tokenCriado = Response.data.token;
                const tipoPerfil = Response.data.perfil;
                localStorage.setItem("auth", Response.data.auth);
                localStorage.setItem("token", tokenCriado);
                localStorage.setItem("tipoPerfil", tipoPerfil);
                localStorage.setItem("email", Response.data.Email);
                Api.post(`/home`, {
                    token: tokenCriado
                }).then((Response) => {
                    const isError = !Response.data.msg.includes("Autenticado");
                    notify.show(Response.data.msg, isError ? "error" : "sucess");
                    if (isError) {
                        history.push("/login");
                    }
                    else {
                        if(tipoPerfil === "professor"){
                            history.push("/home");
                        }
                        if(tipoPerfil === "aluno"){
                            history.push('/alunohome');
                        }
                    }
                })
            }
        });

    };

    //utilizando o yup para fazer a validação dos campos email e senha (min 8 caracteres), ambos preenchimento obrigatório
    const validationLogin = yup.object().shape({
        email: yup
            .string()
            .email(t("Formato inválido."))
            .required(t("Campo E-mail obrigatório")),
        password: yup
            .string()
            .min(8, t("Formato de senha inválido"))
            .required(t("Campo Senha obrigatório.")),
    });



    return (
        <Authentication>
            <h1>{t('Login')}</h1>
            <Formik initialValues={{}}
                onSubmit={handleClickLogin}
                validationSchema={validationLogin}>
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
                        <Field as={Input} size="large" name="password" type="password" className="form-field" placeholder={t("Senha")} />
                        <ErrorMessage
                            component="span"
                            name="password"
                            className="form-error"
                        />
                    </div>
                    <Button className="btn-login" size="large" primary type="submit">{t("Entrar")}</Button>
                    <Link to="/resetsenha">{t("Esqueci minha senha")}</Link>
                    <Link to="/register">{t("Registre-se")}</Link>
                </Form> 
            </Formik>

        </Authentication>

    );
}

export default Login;