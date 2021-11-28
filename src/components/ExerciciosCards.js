import React from 'react';
import CardItem from './CardItem';
import './Cards.css'

function ExerciciosCards() {
  return (
    <div className="cards">
      <div className="cards__container">
        <h3>Exercicios</h3>
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem 
              src="crossfit1.jpg"
              text="Polissapato"
              label="Exercicio"
            />
            <CardItem 
              src="crossfit1.jpg"
              text="Agachamento"
              label="Exercicio"
            />
            <CardItem 
              src="crossfit1.jpg"
              text="Skipping"
              label="Exercicio"
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ExerciciosCards
