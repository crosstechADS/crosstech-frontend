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

function Exercicios() {
  let history = useHistory();

  const redirect = () => {
    history.push('../exerciciosregister')
  }

  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/exercicioSelect`)
      .then((response) => {
        setExercicios(response.data);
      }  
      )
    }, []);

  return (
    <div>
      <h1>Exercícios</h1>
      <Button className="exercicios-button" onClick={redirect} content='Criar Exercicio' basic />
      
      <div className="exercicios-container">
        {typeof exercicios !== "undefined" && exercicios.map((value) => {
          return <ExerciciosCards key={value.ID_EXERCICIO} 
          listCard={exercicios} setListCard={setExercicios}
          ID_EXERCICIO = {value.ID_EXERCICIO}
          DS_EXERCICIO = {value.DS_EXERCICIO}
          OBS_EXERCICIO = {value.OBS_EXERCICIO}
          DT_INCLUSAO = {value.DT_INCLUSAO}></ExerciciosCards>
        })}

      </div>
    </div>
  )
}

export default Exercicios
