import React from 'react';
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

function Exercicios() {
  let history = useHistory();

  const redirect = () => {
    history.push('../exerciciosregister')
  }
  return (
    <div className="exercicios-container">
      <Button onClick={redirect} content='Criar Exercicio' basic />
      <ExerciciosCards />
    </div>
  )
}

export default Exercicios
