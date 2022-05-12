import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import '../../App.css'
import { Button, Segment, Icon, Input } from 'semantic-ui-react';
import './Treinos.css'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import TreinosList from '../../components/TreinosList'

function Treinos() {
  let history = useHistory();

  const redirect = () => {
    history.push('../treinoregister')
  }

  const [treinos, setTreinos] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/treinosSelect`).then((response) => {
      setTreinos(response.data);
    })
  }, []);

  return (
    <div>
      <h1>Treinos</h1>
      <div className='treinos-action'>
        <Button className='treinos-button' onClick={redirect} content='Criar Treino' basic size='large' />

        <Input
          type="text" size='large'
          className='treinos-search ui'
          icon={<Icon name='search' circular link />}
          placeholder="Procurar exercício"
          onChange={(event) => { setSearchItem(event.target.value); }}>
        </Input>
      </div>

      <div className='treinos-container'>
        {typeof treinos !== "undefined" && treinos.filter((value) => {
          if (searchItem == "") {
            return value;
          } else if (value.DS_TREINO.toLowerCase().includes(searchItem.toLowerCase())) {
            return value;
          }
        }).filter((value) => {
          if (value.DT_EXCLUSAO === null) {
            return value;
          }
        }).map((value) => {
          return <TreinosList key={value.ID_TREINO}
            listCard={treinos} setListCard={setTreinos}
            treino={value} />
        })}
      </div>


    </div>
  )
}

export default Treinos
