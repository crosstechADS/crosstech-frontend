import React from 'react';
import CardItem from './CardItem';
import './ExerciciosCards.css';
import {Link} from 'react-dom';

import {BsPencil, BsFillTrashFill} from 'react-icons/bs';

function ExerciciosCards({ID_EXERCICIO, DS_EXERCICIO, OBS_EXERCICIO, DT_INCLUSAO, handleRemove}) {
  return (
    <div className='exercicio_card'>
      <h4>{DS_EXERCICIO}</h4>
      <p>
        <span>Detalhes: </span>{OBS_EXERCICIO}
      </p>
      <p>
        <span>Data de inclusão: </span>{DT_INCLUSAO}
      </p>
      <div className='exercicio_card_actions'>
        <Link to="/">
          <BsPencil /> Editar
        </Link>
        <button>
          <BsFillTrashFill/> Excluir
        </button>
      </div>
    </div>
  )
}

export default ExerciciosCards
