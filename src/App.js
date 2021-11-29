import './App.css';
import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Exercicios from './pages/Exercicios/Exercicios';
import ExerciciosView from './pages/ExerciciosView/ExerciciosView';
import ExerciciosRegister from './pages/ExerciciosRegister/ExerciciosRegister';
import Treino from './pages/Treino/Treino';
import Notifications from 'react-notify-toast';
import Navbar from './components/Navbar';
import HomeBg from './components/HomeBg';
import TreinoView from './pages/TreinoView/TreinoView';
import Exercicio from './components/Exercicio';


// import { Container } from './styles';

function App() {
  return (
    <div>
      <Notifications options={{ zIndex: 200, top: '150px' }} /><Router><Switch>


        <Route path="/" exact strict>
          {/* <Home /> */}
          <Redirect to="/login" />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/home">
          <Home />
          <Navbar />
          <HomeBg />
        </Route>

        <Route path="/exercicios">
          <Navbar />
          <Exercicios />
        </Route>

        <Route path="/exerciciosview">
          <Navbar />
          <ExerciciosView />
        </Route>

        <Route path="/exerciciosregister">
          <Navbar />
          <ExerciciosRegister />
        </Route>

        <Route path="/treino">
          <Navbar />
          <Treino />
        </Route>

        <Route path="/treinoview">
          <Navbar />
          <TreinoView />
          <Exercicio />
          <Exercicio />
          <Exercicio />
        </Route>


      </Switch>
      </Router>
    </div>);
}

export default App;