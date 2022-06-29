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
import Register from './pages/ViewGerencia/UsuarioRegister';
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
import AlunoHome from './pages/ViewAluno/AlunoHome/AlunoHome';
import AlunoTreino from './pages/ViewAluno/AlunoTreino/AlunoTreino'
import GerenciaHome from './pages/ViewGerencia/GerenciaHome/GerenciaHome';
import RecepcaoHome from './pages/ViewRecepcao/RecepcaoHome/RecepcaoHome';
import AlunoRegister from './pages/ViewRecepcao/AlunoRegister/AlunoRegister';

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
          <Navbar perfil={perfil} />
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
          <Alunos perfil={perfil} />
        </Route>

        <Route path="/alunohome">
          <Navbar perfil={perfil} />
          <AlunoHome email={email} />
        </Route>

        <Route path='/alunotreino/:id'>
          <Navbar perfil={perfil} />
          <AlunoTreino email={email} />
        </Route>

        <Route path="/recepcaohome">
          <Navbar perfil={perfil} />
          <RecepcaoHome />
        </Route>

        <Route path="/alunoregister">
          <Navbar perfil={perfil} />
          <AlunoRegister />
        </Route>

        <Route path="/gerenciahome">
          <Navbar perfil={perfil} />
          <GerenciaHome />
        </Route>

      </Switch>
      </Router>
    </div>
  );
}

export default App;