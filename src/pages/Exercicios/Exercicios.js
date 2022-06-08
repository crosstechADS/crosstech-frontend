import {React, useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import '../../App.css'
import { Button, Segment } from 'semantic-ui-react';
import './Exercicios.css'
import ExerciciosCards from "../../components/ExerciciosCards";
import { Link, useHistory } from "react-router-dom";
import Container from '../../components/Container'
import Api from '../../config/Api';
import {Input, Icon} from 'semantic-ui-react'
import Loading from '../../components/Loading'
import ExerciciosItem from '../../components/ExerciciosItem';
import 'semantic-ui-css/semantic.css';
import { useTranslation } from 'react-i18next';

function Exercicios({perfil}) {
  let history = useHistory();

  const { t } = useTranslation();
  const redirect = () => {
    history.push('../exerciciosregister')
  }

  const [removeLoading, setRemoveLoading] = useState(false);

  const [searchItem, setSearchItem] = useState("");

  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    Api.get(`/exercicioSelect`)
      .then((response) => {
        setExercicios(response.data);
        setRemoveLoading(true);
      }  
      )
    }, []);

  return (
    <div>
      <h1>{t('Exercícios')}</h1>
      <div className='exercicios-action'>
        {perfil !== "aluno" && 
        <Button className="exercicios-button" size='large'
          onClick={redirect} 
          content='Criar Exercicio' basic />}
        <Input
          type="text" size='large'
          className='exercicios-search ui'
          icon={<Icon name='search' circular link />}
          placeholder={t("Procurar exercício")}
          onChange={(event) => {setSearchItem(event.target.value);}}>
        </Input>
      </div>

      <div className="exercicios-container">
      {typeof exercicios !== "undefined" && exercicios.filter((value) => {
          if (searchItem == "") {
            return value;
          } else if (value.DS_EXERCICIO.toLowerCase().includes(searchItem.toLowerCase())) {
            return value;
          }
        }).filter((value) => {
          if(value.DT_EXCLUSAO === null){
            return value;
          }
        }).map((value) => {
          return <ExerciciosItem key={value.ID_EXERCICIO}
            listCard={exercicios} setListCard={setExercicios}
            exercicio={value} />
            
        })}
        {!removeLoading && <Loading />}

      </div>
    </div>
  )
}

export default Exercicios
