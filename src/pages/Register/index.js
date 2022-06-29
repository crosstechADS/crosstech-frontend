import "./style.css";
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Api from '../../config/Api';
import Authentication from '../Authentication';
import { Input, Button, Dropdown } from "semantic-ui-react";
import { notify } from "react-notify-toast";
import { useHistory } from "react-router-dom";
import { CgCornerDownLeft } from "react-icons/cg";
import { useTranslation } from 'react-i18next';


function Register() {
    const { t } = useTranslation();
    const history = useHistory();
    const [tiposPerfil, setTiposPerfil] = useState([]);
    const [tipo, setTipo] = useState('');
    const [tipoNome, setTipoNome] = useState('');

    const routeChange = () => {
        let path = `/login`;
        history.push(path);
    }

    useEffect(() => {
        Api.get(`/tipoPerfilSelect`)
            .then((response) => {
                setTiposPerfil(response.data);
            });
    }, []);

    const tipoPerfilOptions = tiposPerfil.map((value) => ({
        key: value.DS_TIPO_PERFIL,
        text: value.DS_TIPO_PERFIL,
        value: value.ID_TIPO_PERFIL
    }));


    //ação do botao cadastrar
    const handleClickRegister = (values) => {
        Api.post(`/register`, {
            nome: values.nome,
            email: values.email,
            password: values.password,
            dataInclusao: values.dataInclusao,
            dataExclusao: values.dataExclusao,
            profile: tipoNome,
            idProfile: tipo,
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
            .required(t("Campo Nome obrigatório")),
        email: yup
            .string()
            .email(t("Formato inválido."))
            .required(t("Campo E-mail obrigatório")),
        password: yup
            .string()
            .min(8, t("Formato de senha inválido"))
            .required(t("Campo Senha obrigatório")),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], t("A combinação de senhas não bate.")),
        cpf: yup
            .string()
            .required(t("Campo CPF obrigatório")),
        dataNascimento: yup
            .date()
            .required(t("Campo Nascimento obrigatório")),
        cep: yup
            .string()
            .required(t("Campo CEP obrigatório")),
        cidade: yup
            .string()
            .required(t("Campo Cidade obrigatório")),
        uf: yup
            .string()
            .required(t("Campo UF obrigatório")),
        rua: yup
            .string()
            .required(t("Campo Rua obrigatório")),
        numeroLogradouro: yup
            .string()
            .required(t("Campo Nº do logradouro obrigatório")),
        bairro: yup
            .string()
            .required(t("Campo Bairro obrigatório"))
    });

    //função para auto preenchimento de tabelas de acordo com cep inserido pelo usuário
    function onBlurCep(ev, setFieldValue) {
        const { value } = ev.target;

        //formatando string recebida para formato aceito pela API
        const cep = value?.replace(/[^0-9]/g, '');

        //corta a execução da função caso cep não tenha a qauntidade necessária de caracteres
        if (cep?.length !== 8) {
            return;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => res.json())
            .then((data) => {
                setFieldValue('cidade', data.localidade);
                setFieldValue('rua', data.logradouro);
                setFieldValue('uf', data.uf);
                setFieldValue('bairro', data.bairro);
            });
    }

    return <Authentication>
        <h1>{t("Cadastro")}</h1>
        <Formik initialValues={{}}
            onSubmit={handleClickRegister}
            validationSchema={validationCadastro}>
            {({ setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="label">
                        <label class="label"><h3>{t("Informações pessoais")}</h3></label>
                        <div className="login-form-group">
                            <Field as={Input} size="large"
                                name="nome"
                                className="form-field"
                                placeholder={t("Nome")} />
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
                                name="password"
                                type="password"
                                className="form-field"
                                placeholder={t("Senha")} />
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
                                placeholder={t("Confirme sua senha")} />
                            <ErrorMessage
                                component="span"
                                name="confirmPassword"
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
                        <label>{t("Data de Nascimento")}</label>
                        <div className="login-form-group">
                            <Field as={Input} size="large"
                                name="dataNascimento"
                                type="date"
                                className="form-field"
                                placeholder={t("Data de nascimento")} />
                            <ErrorMessage
                                component="span"
                                name="dataNascimento"
                                className="form-error"
                            />
                        </div>
                    </div>
                    <div className="label"><h3>{t("Informações de endereço")}</h3>
                        <div className="login-form-group">
                            <Field as={Input} size="large"
                                name="cep"
                                className="form-field"
                                placeholder={t("CEP")}
                                onBlur={(ev) => onBlurCep(ev, setFieldValue)} />
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
                                placeholder={t("Cidade")} />
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
                                placeholder={t("UF")} />
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
                                placeholder={t("Rua")} />
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
                                placeholder={t("Nº do logradouro")} />
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
                                placeholder={t("Bairro")} />
                            <ErrorMessage
                                component="span"
                                name="bairro"
                                className="form-error"
                            />
                        </div>
                        <div className="login-form-group">
                            <Dropdown
                                name="profile"
                                value={tipo}
                                placeholder={t("Tipo de perfil")}
                                search
                                selection
                                options={tipoPerfilOptions}
                                onChange={(e, data) => {
                                    setTipo(data.value);
                                    setTipoNome(data.text);
                                }} />
                            <ErrorMessage
                                component="span"
                                name="profile"
                                className="form-error"
                            />

                        </div>
                    </div>

                    <Button className="btn-login" size="large" primary type="submit">{t("Cadastrar")}</Button>
                    <Button size="large" className="btn-voltar" onClick={routeChange}>{t("Voltar")}<CgCornerDownLeft /></Button>
                </Form>
            )}
        </Formik>
    </Authentication>
}

export default Register;