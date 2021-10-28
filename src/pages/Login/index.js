import "./index.css"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import logo from '../../logo.png';
import Authentication from '../Authentication';
import { Input, Button } from "semantic-ui-react";
import { notify } from 'react-notify-toast';
import { Link, useHistory } from "react-router-dom";




function Login() {

    const history = useHistory();

    //ação do botão login
    const handleClickLogin = (values) => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            nome: values.nome,
            email: values.email,
            password: values.password
        }).then((Response) => {
            const isError = !Response.data.msg.includes("sucesso");
            notify.show(Response.data.msg, isError ? "error" : "success");
            if (isError) {
                history.push("/login");
            }
            else {
                history.push("/dashboard");
            }

        });

    };

    //utilizando o yup para fazer a validação dos campos email e senha (min 8 caracteres), ambos preenchimento obrigatório
    const validationLogin = yup.object().shape({
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
            <h1>Login</h1>
            <Formik initialValues={{}}
                onSubmit={handleClickLogin}
                validationSchema={validationLogin}>
                <Form className="login-form">
                    <div className="login-form-group">
                        <Field as={Input} size="large" name="email" className="form-field" placeholder="Email" />
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
                    <Button className="btn-login" size="large" primary type="submit">Entrar</Button>
                    <Link to="/register" > Registre-se</Link>
                </Form>
            </Formik>

        </Authentication>

    );
}

export default Login;