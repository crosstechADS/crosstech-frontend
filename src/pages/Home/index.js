import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import '../../App.css'
import Navbar from '../../components/Navbar';
import Treino from '../Treino/Treino';
import Exercicios from '../Exercicios/Exercicios'
import './index.css'

// import { Container } from './styles';

function Home() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component= {Home}/>
          <Route path='/exercicios' component={Exercicios} />
          <Route path='/treino' component={Treino} />
        </Switch>
      </Router>
    </>
  );
}

export default Home;