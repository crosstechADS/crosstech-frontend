import React, { useEffect, useState, PureComponent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './RecepcaoHome.css'
import Api from '../../../config/Api';
import logo from '../../../logo.png'
import { useTranslation } from 'react-i18next';
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';

function RecepcaoHome() {
    const { t } = useTranslation();

    return (
        <div className='recepcao-container'>
            <div className='recepcao-home'>
                <h2>{t('Bem vindo(a), recepcionista!')}</h2>
                <div className='logo-recepcao'>
                    <img src={logo} />
                </div>

                <Link to={`/alunos`}>
                    <div className='recepcao-view-aluno'><p>Consultar alunos cadastrados</p></div>
                </Link>
                <Link to={`/alunoregister`}>
                    <div className='recepcao-view-aluno'><p>Cadastrar novo aluno</p></div>
                </Link>
            </div>
        </div>
    );

}

export default RecepcaoHome