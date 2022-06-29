import React, { useEffect, useState, PureComponent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './GerenciaHome.css'
import Api from '../../../config/Api';
import Loading from '../../../components/Loading';
import logo from '../../../logo.png'
import { useTranslation } from 'react-i18next';

function GerenciaHome() {
    const { t } = useTranslation();

    return (
        <div className='gerencia-container'>
            <div className='gerencia-home'>
                <h2>{t('Bem vindo(a), gerente!')}</h2>
                <div className='logo-gerencia'>
                    <img src={logo} />
                </div>
                <Link to={`/register`}>
                    <div className='gerencia-view-aluno'><p>Cadastrar novo usuário</p></div>
                </Link>
            </div>
        </div>
    );

}

export default GerenciaHome