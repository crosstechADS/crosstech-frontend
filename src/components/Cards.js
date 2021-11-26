import React from 'react';
import CardItem from './CardItem';
import './Cards.css'

function Cards() {
  return (
    <div className="cards">
      <div className="cards__container">
        <h3>Treinos</h3>
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem 
              src="crossfit1.jpg"
              text="Treino A"
              label="Treino"
            />
            <CardItem 
              src="crossfit1.jpg"
              text="Treino B"
              label="Treino"
            />
            <CardItem 
              src="crossfit1.jpg"
              text="Treino C"
              label="Treino"
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
