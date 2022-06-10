import { React, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import '../../App.css'
import './Alunos.css'
import { Button, Segment } from 'semantic-ui-react';
import { Link, useHistory } from "react-router-dom";
import { Input, Icon } from 'semantic-ui-react'
import AlunosCards from '../../components/AlunosCards';
import Api from '../../config/Api';
import { useTranslation } from 'react-i18next';

function Alunos() {

  const [searchItem, setSearchItem] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();
  // const redirect = () => {
  //   history.push(`/aluno/${ID_USUARIO}`);
  // }

  const pages = Math.ceil(alunos.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  

  useEffect(() => {
    Api.get(`/alunosSelect`)
      .then((response) => {
        setAlunos(response.data);
      }
      )
  }, []);

  const currentItens = alunos.slice(startIndex, endIndex);

  return (
    <div>
      <h1>{t('Alunos')}</h1>
      <div className='alunos-action'>
        <Input
          type="text" size='large'
          className='alunos-search ui'
          icon={<Icon name='search' circular link />}
          placeholder={t("Procurar aluno")}
          onChange={(event) => { setSearchItem(event.target.value); }}>
        </Input>
      </div>
      <div className='item-container'>
        <div className='item-action'>
          <select value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="alunos-container">
          {typeof currentItens !== "undefined" && currentItens.filter((value) => { 
            if (searchItem == "") {
              return value;
            } else if (value.DS_NOME.toLowerCase().includes(searchItem.toLowerCase())) {
              return value;
            }
          })
          .map((value) => {
          return <div className='item-container'>
            <div className='item'>
              <span >Nome: </span>
              <span >{value.DS_NOME} - </span>
              <span > CPF: </span>
              <span >{value.DS_CPF}</span>
              {/* <Button primary floated="right" onClick={redirect}>{t('Detalhes')} <Icon name="right chevron" /></Button> */}
            </div>
          </div>
        })}
        
        </div>
        <div className='item-action'>
          {Array.from(Array(pages), (alunos, index) => {
            return <button value={index} onClick={(e) => setCurrentPage(Number(e.target.value))} className='pageButton'>{index +1}</button>
          })}
        </div>
      </div>
    </div>
  )
}

export default Alunos