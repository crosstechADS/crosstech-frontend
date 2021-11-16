import React from 'react';
import CardItem from './CardItem';
import './Cards.css'

function Cards() {
  return (
    <div className="cards">
      <h1>Treino de hoje</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem 
              src="crossfit1.jpg"
              text="Corpo Inteiro"
              label="Treino"
            />
          </ul>
        </div>
        <h3>Outros</h3>
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem 
              src="crossfit1.jpg"
              text="Corpo Inteiro"
              label="Treino"
            />
            <CardItem 
              src="crossfit1.jpg"
              text="Corpo Inteiro"
              label="Treino"
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
