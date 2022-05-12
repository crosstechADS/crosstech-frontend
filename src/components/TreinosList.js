import React from "react";
import { Link } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import "./TreinosList.css";
import {AiOutlinePlus} from 'react-icons/ai';

export default function TreinosList(props) {
  const { ID_TREINO, DS_TREINO, OBS_TREINO, DS_NOME} = props.treino;
  return (
    <div className='card'>
      <div className="card_body">
        <h2 className="card_title">{DS_TREINO}</h2>
        <h3 className="card_subtitle">Aluno: {DS_NOME}</h3>
        <p className="card_description">{OBS_TREINO}</p>
        <div className='treino_card_actions'>
          <Link to={`/treino/${ID_TREINO}`} className="card_btn"><AiOutlinePlus /> Detalhes</Link>
        </div>
      </div>
    </div>
  );
}