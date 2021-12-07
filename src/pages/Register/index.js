import "./style.css";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import Authentication from '../Authentication';
import { Input, Button, Select } from "semantic-ui-react";
import { notify } from "react-notify-toast";
import { Redirect } from "react-router";
import { Link, useHistory } from "react-router-dom";


function Register() {
    const history = useHistory();
    //ação do botao cadastrar
    const handleClickRegister = (values) => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
            nome: values.nome,
            email: values.email,
            password: values.password,
            inicioMatricula: values.inicioMatricula,
            fimMatricula: values.fimMatricula,
            profile: values.profile,
            cpf: values.cpf,
            dataNascimento: values.dataNascimento,
            cep: values.cep,
            cidade: values.cidade,
            uf: values.uf,
            rua: values.rua,
            numeroLogradouro: values.numeroLogradouro,
            bairro: values.bairro
        }).then((Response) => {
            const isError = !Response.data.msg.includes("sucesso");
            notify.show(Response.data.msg, isError ? "error" : "success");
            if (isError) {
                history.push("/register");
            }
            else {
                history.push("/login");
            }
        });
    };

    //faz a validação dos campos do cadastro
    const validationCadastro = yup.object().shape({
        nome: yup
            .string()
            .required("Campo Nome obrigatório"),
        email: yup
            .string()
            .email("Formato inválido.")
            .required("Campo E-mail obrigatório"),
        profile: yup
            .string()
            .min(1, "Formato inválido.")
            .required("Campo Tipo perfil obrigatório"),
        password: yup
            .string()
            .min(8, "Formato de senha inválido")
            .required("Campo Senha obrigatório."),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "A combinação de senhas não bate."),
        cpf: yup
            .string()
            .required("Campo CPF obrigatório"),
        dataNascimento: yup
            .date()
            .required("Campo Nascimento obrigatório"),
        inicioMatricula: yup
            .date()
            .required("Campo Início Matrícula obrigatório"),
        fimMatricula: yup
            .date()
            .required("Campo Fim Matrícula obrigatório"),
        cep: yup
            .string()
            .required("Campo CEP obrigatório"),
        cidade: yup
            .string()
            .required("Campo Cidade obrigatório"),
        uf: yup
            .string()
            .required("Campo UF obrigatório"),
        rua: yup
            .string()
            .required("Campo Rua obrigatório"),
        numeroLogradouro: yup
            .string()
            .required("Campo Nº do logradouro obrigatório"),
        bairro: yup
            .string()
            .required("Campo Bairro obrigatório")
    });

    /*const options = [
        { key: 'g', text: 'Gerente', value: 'gerente' },
        { key: 'r', text: 'Recepcionista', value: 'recepcionista' },
        { key: 'p', text: 'Professor', value: 'professor' },
        { key: 'a', text: 'Aluno', value: 'aluno' }
    ]*/

    return <Authentication>
        <h1>Cadastro</h1>
        <Formik initialValues={{}}
            onSubmit={handleClickRegister}
            validationSchema={validationCadastro}>
            <Form className="login-form">

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="nome"
                        className="form-field"
                        placeholder="Nome" />
                    <ErrorMessage
                        component="span"
                        name="nome"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="email"
                        className="form-field"
                        placeholder="Email" />
                    <ErrorMessage
                        component="span"
                        name="email"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="profile"
                        className="form-field"
                        placeholder="Tipo Perfil" />
                    <ErrorMessage
                        component="span"
                        name="profile"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="password"
                        type="password"
                        className="form-field"
                        placeholder="Senha" />
                    <ErrorMessage
                        component="span"
                        name="password"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="confirmPassword"
                        type="password"
                        className="form-field"
                        placeholder="Confirme sua senha" />
                    <ErrorMessage
                        component="span"
                        name="confirmPassword"
                        className="form-error"
                    />
                </div>
                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="inicioMatricula"
                        className="form-field"
                        placeholder="Início da Matrícula" />
                    <ErrorMessage
                        component="span"
                        name="inicioMatricula"
                        className="form-error"
                    />
                </div>
                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="fimMatricula"
                        className="form-field"
                        placeholder="Fim da Matrícula" />
                    <ErrorMessage
                        component="span"
                        name="fimMatricula"
                        className="form-error"
                    />
                </div>
                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="cpf"
                        className="form-field"
                        placeholder="CPF" />
                    <ErrorMessage
                        component="span"
                        name="cpf"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="dataNascimento"
                        className="form-field"
                        placeholder="Data de nascimento" />
                    <ErrorMessage
                        component="span"
                        name="dataNascimento"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="cep"
                        className="form-field"
                        placeholder="CEP" />
                    <ErrorMessage
                        component="span"
                        name="cep"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="cidade"
                        className="form-field"
                        placeholder="Cidade" />
                    <ErrorMessage
                        component="span"
                        name="cidade"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="uf"
                        className="form-field"
                        placeholder="UF" />
                    <ErrorMessage
                        component="span"
                        name="uf"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="rua"
                        className="form-field"
                        placeholder="Rua" />
                    <ErrorMessage
                        component="span"
                        name="rua"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="numeroLogradouro"
                        className="form-field"
                        placeholder="Nº do logradouro" />
                    <ErrorMessage
                        component="span"
                        name="numeroLogradouro"
                        className="form-error"
                    />
                </div>

                <div className="login-form-group">
                    <Field as={Input} size="large"
                        name="bairro"
                        className="form-field"
                        placeholder="Bairro" />
                    <ErrorMessage
                        component="span"
                        name="bairro"
                        className="form-error"
                    />
                </div>

                <Button className="btn-login" size="large" primary type="submit">Cadastrar</Button>
                <Link to="/login" >Voltar</Link>
            </Form>

        </Formik>
    </Authentication>
}

export default Register;