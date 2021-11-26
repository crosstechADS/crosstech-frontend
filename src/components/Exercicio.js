import React from 'react';
import './Exercicio.css';
import '../App.css';

function Exercicio() {
  return (
    <div className="exercicio">
      <div className="exercicio-media">
        <iframe src="https://embed.lottiefiles.com/animation/35115"></iframe>
      </div>
      <div className="exercicio-descricao">
        <p className="titulo-exercicio">Rosca Direta</p>
        <p>Deve ser feito movendo a articulação do cotovelo, ocorrendo a flexão de cotovelo</p>
        <label for="peso">Peso: </label>
        <input type="number" id="peso" name="peso"></input>
        <br />
        <input type="submit" value="OK"></input>
      </div>
    </div>
  )
}

export default Exercicio
