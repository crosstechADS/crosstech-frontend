import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import '../../App.css'
import { Button, Segment } from 'semantic-ui-react';
import './Treino.css'
import Cards from '../../components/Cards';
import CardItem from '../../components/CardItem';

function Treino() {
  let history = useHistory();

  const redirect = () => {
    history.push('../treinoregister')
  }

  return (
    <div className="treino-container">
      <Button onClick={redirect} content='Criar Treino' basic />
      <Cards />
    </div>
  )
}

export default Treino
