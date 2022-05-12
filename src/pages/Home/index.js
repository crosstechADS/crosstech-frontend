import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import '../../App.css'
import Navbar from '../../components/Navbar';
import Treinos from '../Treinos/Treinos';
import Exercicios from '../Exercicios/Exercicios'
import Alunos from '../Alunos/Alunos';
import './index.css'
import { useEffect } from 'react';
import Axios from "axios";
import { useHistory } from 'react-router-dom';

// import { Container } from './styles';

function Home({token, auth}) {

  let history = useHistory();

  useEffect(() => {
    if(auth != "true"){
      window.location.pathname = ('/');
    }
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/home`, {
      token: token
    }).then((Response) => {
      const isError = !Response.data.msg.includes("Autenticado");
      if (isError) {
          console.log("erro")
          history.push("/login");
      }
      else {
          history.push("/home");
      }
  })
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component= {Home}/>
          <Route path='/exercicios' component={Exercicios} />
          <Route path='/treinos' component={Treinos} />
        </Switch>
      </Router>
    </>
  );
}

export default Home;