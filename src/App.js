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
import Exercicio from './pages/Exercicio/Exercicio.js';
import ExerciciosRegister from './pages/ExerciciosRegister/ExerciciosRegister';
import Treinos from './pages/Treinos/Treinos';
import Treino from './pages/Treino/Treino';
import TreinoRegister from './pages/TreinoRegister/TreinoRegister';
import Notifications from 'react-notify-toast';
import Navbar from './components/Navbar';
import HomeBg from './components/HomeBg';
import ResetSenha from './pages/ResetSenha/ResetSenha';
import Alunos from './pages/Alunos/Alunos';

// import { Container } from './styles';

function App() {

  const token = localStorage.getItem('token');
  const perfil = localStorage.getItem('tipoPerfil');
  const auth = localStorage.getItem("auth");
  const email = localStorage.getItem("email");

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

        <Route path="/resetsenha">
          <ResetSenha />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/home">
          <Home token={token} auth={auth} />
          <Navbar perfil={perfil} />
          <HomeBg />
        </Route>

        <Route path="/exercicios">
          <Navbar perfil={perfil} />
          <Exercicios perfil={perfil} />
        </Route>

        <Route path="/exerciciosregister">
          <Navbar perfil={perfil} />
          <ExerciciosRegister />
        </Route>

        <Route path="/exercicio/:id">
          <Navbar perfil={perfil} />
          <Exercicio perfil={perfil} />
        </Route>

        <Route path="/treinos">
          <Navbar perfil={perfil} />
          <Treinos />
        </Route>

        <Route path="/treino/:id">
          <Navbar perfil={perfil} />
          <Treino perfil={perfil} />
        </Route>

        <Route path="/treinoregister">
          <Navbar perfil={perfil} />
          <TreinoRegister />
        </Route>

        <Route path="/alunos">
          <Navbar perfil={perfil} />
          <Alunos />
        </Route>

      </Switch>
      </Router>
    </div>
  );
}

export default App;