import React from "react";
import {Link} from 'react-dom';
import { Container } from "semantic-ui-react";
import "./ExerciciosCards.css";
import {BsPencil, BsFillTrashFill} from 'react-icons/bs';

export default function ExerciciosCards(props){
  return(
    <div className='card'>
      <div className="card_body">
      <h2 className="card_title">{props.DS_EXERCICIO}</h2>
      <p className="card_description">{props.OBS_EXERCICIO}</p>
      <p className="card_description">{props.DT_INCLUSAO}</p>
      <div className='exercicio_card_actions'>
        <button className="card_btn"><BsPencil /> Editar</button>
        <button className="card_btn"><BsFillTrashFill/> Excluir</button>
      </div>
      </div>
    </div>
  );
}