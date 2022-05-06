import {React, useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import '../../App.css'
import './Alunos.css'
import { Button, Segment } from 'semantic-ui-react';
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import {Input, Icon} from 'semantic-ui-react'
import AlunosCards from '../../components/AlunosCards';

function Alunos() {

  const [searchItem, setSearchItem] = useState("");
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/alunosSelect`)
      .then((response) => {
        setAlunos(response.data);
      }  
      )
  }, []);

  return(
    <div>
      <h1>Alunos</h1>
      <div className='alunos-action'>
      <Input
        type="text" size='large'
        className='alunos-search ui'
        icon={<Icon name='search' circular link />}
        placeholder="Procurar aluno"
        onChange={(event) => {setSearchItem(event.target.value);}}>
      </Input>
      </div>
      <div className="alunos-container">
        {typeof alunos !== "undefined" && alunos.filter((value) => {
          if (searchItem == "") {
            return value;
          } else if (value.DS_NOME.toLowerCase().includes(searchItem.toLowerCase())) {
            return value;
          }
        }).map((value) => {
          return <AlunosCards key={value.ID_USUARIO}
          listCard={alunos} setListCard={setAlunos}
          alunos={value}/>
        })}
      </div>
    </div>
  )
}

export default Alunos