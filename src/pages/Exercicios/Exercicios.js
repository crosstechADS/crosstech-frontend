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
  return (
    <div className="exercicio-container">
      <Link to="/exerciciosregister" className="btn-login" size="large"> Criar Exercicio </Link>

      <ExerciciosCards />
    </div>
  )
}

export default Exercicios
