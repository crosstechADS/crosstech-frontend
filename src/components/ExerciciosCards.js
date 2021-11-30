import React from 'react';
import CardItem from './CardItem';
import './Cards.css'

function ExerciciosCards() {
  return (
    <div className="cards">
      <div className="cards__container">
        <h1>Exercicios</h1>
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem 
              src="polisapato.jpg"
              title="Polisapato"
              text="Exercício de duração de 3 mins com objetivo de melhorar a coordenação motora e a resistência muscular"
              label="Aeróbica"
            /> 
            <CardItem 
              src="remada.jpg"
              title="Remada"
              text="Exercício multiarticular com ênfase no grupamento muscular das costas"
              label="Funcional"
            />
            <CardItem 
              src="thehundred.jpg"
              title="The Hundred"
              text="Exercício com foco no desenvolvimento dos extensores dos joelhos"
              label="Pilates"
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ExerciciosCards
