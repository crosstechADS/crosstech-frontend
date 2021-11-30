import React from 'react';
import CardItem from './CardItem';
import './Cards.css'

function Cards() {
  return (
    <div className="cards">
      <div className="cards__container">
        <h1>Treinos</h1>
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem 
              src="crossfit1.jpg"
              title="Treino A"
              text="Treino focado no desenvolvimento dos membros superiores"
              label="Treino"
            />
            <CardItem 
              src="crossfit1.jpg"
              title="Treino B"
              text = "Treino focado no desenvolvimento dos membros inferiores"
              label="Treino"
            />
            <CardItem 
              src="crossfit1.jpg"
              title="Treino C"
              text= "Treino com foco no desenvolvimento cardiovascular"
              label="Treino"
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
