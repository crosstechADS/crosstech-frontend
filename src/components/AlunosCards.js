import React from "react";
import { Link } from 'react-dom';
import { Container } from "semantic-ui-react";
import "./AlunosCards.css";
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';

export default function AlunosCards(props) {
  const { DS_NOME, DS_CPF} = props.alunos;
  return (
    <div className='card'>
      <div className="card_body">
        <p className="card_name">{DS_NOME}</p>
        <p className="card_cpf">{DS_CPF}</p>
        {/* <p className="card_description">{DS_CPF}</p> */}
        <div className='aluno_card_actions'>
          <button className="card_btn"><BsPencil /> Editar</button>
        </div>
      </div>
    </div>
  );
}