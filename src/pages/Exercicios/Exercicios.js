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
import Axios from "axios";
import {Input, Icon} from 'semantic-ui-react'
import Loading from '../../components/Loading'

function Exercicios() {
  let history = useHistory();

  const redirect = () => {
    history.push('../exerciciosregister')
  }

  const [removeLoading, setRemoveLoading] = useState(false);

  const [searchItem, setSearchItem] = useState("");

  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/exercicioSelect`)
      .then((response) => {
        setExercicios(response.data);
        setRemoveLoading(true);
      }  
      )
    }, []);

  return (
    <div>
      <h1>Exercícios</h1>
      <div className='exercicios-action'>
        <Button className="exercicios-button" size='large'
          onClick={redirect} 
          content='Criar Exercicio' basic />
        <Input
          type="text" size='large'
          className='exercicios-search ui'
          icon={<Icon name='search' circular link />}
          placeholder="Procurar exercício"
          onChange={(event) => {setSearchItem(event.target.value);}}>
        </Input>
      </div>

      <div className="exercicios-container">
        {typeof exercicios !== "undefined" && exercicios.filter((value) => {
          if(searchItem == ""){
            return value;
          } else if (value.DS_EXERCICIO.toLowerCase().includes(searchItem.toLowerCase())){
            return value;
          }
        }).map((value) => {
          return <ExerciciosCards key={value.ID_EXERCICIO} 
          listCard={exercicios} setListCard={setExercicios}
          ID_EXERCICIO = {value.ID_EXERCICIO}
          DS_EXERCICIO = {value.DS_EXERCICIO}
          OBS_EXERCICIO = {value.OBS_EXERCICIO}
          DT_INCLUSAO = {value.DT_INCLUSAO}></ExerciciosCards>
        })}
        {!removeLoading && <Loading />}

      </div>
    </div>
  )
}

export default Exercicios
