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
import Notifications from 'react-notify-toast';


// import { Container } from './styles';

function App() {
  return (
  <div>
    <Notifications options={{ zIndex: 200, top: '50px' }} /><Router><Switch>

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
      </Route>

    </Switch>
    </Router>
  </div>);
}

export default App;