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
import ExerciciosCards from '../../components/ExerciciosCards';
import CardItem from '../../components/CardItem';
import { Link, useHistory } from "react-router-dom";
import Container from '../../components/Container'

function Exercicios() {
  let history = useHistory();

  const redirect = () => {
    history.push('../exerciciosregister')
  }

  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/exercicioSelect`, {
      method: 'GET',
      headers:{ 
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.json())
    .then((data) => {
      console.log(data);
      setExercicios(data);
      console.log(exercicios);
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="exercicios-container">
      <Button onClick={redirect} content='Criar Exercicio' basic />
      <Container>
        {exercicios.length > 0 && exercicios.map((exercicio) => (
          <ExerciciosCards 
          ID_EXERCICIO = {exercicio.ID_EXERCICIO}
          DS_EXERCICIO = {exercicio.DS_EXERCICIO}
          OBS_EXERCICIO = {exercicio.OBS_EXERCICIO}
          DT_INCLUSAO = {exercicio.DT_INCLUSAO}
          key = {exercicio.ID_EXERCICIO}/>
        ))}
      </Container>
    </div>
  )
}

export default Exercicios
