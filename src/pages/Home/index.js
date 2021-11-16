import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import '../../App.css'
import Navbar from '../../components/Navbar';
import Cards from '../../components/Cards';

// import { Container } from './styles';

function Home() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact />
        </Switch>
      </Router>
      <Cards />
    </>
  );
}

export default Home;