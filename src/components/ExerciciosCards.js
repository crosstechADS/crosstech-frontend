import React from "react";
import {Link} from 'react-dom';
import { Container } from "semantic-ui-react";
import "./ExerciciosCards.css";
import {BsPencil, BsFillTrashFill} from 'react-icons/bs';

export default function ExerciciosCards(props){
  return(
    <div className='exercicio_card'>
      <h4>{props.DS_EXERCICIO}</h4>
      <p>
        <span>Detalhes: </span>{props.OBS_EXERCICIO}
      </p>
      <p>
        <span>Data de inclusão: </span>{props.DT_INCLUSAO}
      </p>
      <div className='exercicio_card_actions'>
        <button><BsPencil /> Editar</button>
        <button><BsFillTrashFill/> Excluir</button>
      </div>
    </div>
  );
}