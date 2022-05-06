import React from "react";
import { Link } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import "./ExerciciosCards.css";
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

export default function ExerciciosCards(props) {
  const { ID_EXERCICIO, DS_EXERCICIO, OBS_EXERCICIO, DS_MIDIA_URL, DS_TIPO_EXERCICIO } = props.exercicio;
  return (
    <div className='card'>
      <img className="card_img" src={DS_MIDIA_URL} />
      <div className="card_body">
        <h2 className="card_title">{DS_EXERCICIO}</h2>
        <h3 className="card_subtitle">{DS_TIPO_EXERCICIO}</h3>
        <p className="card_description">{OBS_EXERCICIO}</p>
        <div className='exercicio_card_actions'>
          <Link to={`/exercicio/${ID_EXERCICIO}`} className="card_btn"><BsPencil /> Editar</Link>
          <button className="card_btn"><BsFillTrashFill /> Excluir</button>
        </div>
      </div>
    </div>
  );
}