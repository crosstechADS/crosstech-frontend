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

function Exercicios() {
  return (
    <div className="exercicio-container">
      <Button content='Criar Exercicio' basic />
      <ExerciciosCards />
    </div>
  )
}

export default Exercicios
