import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
      <li className="cards__item">
        <p className="cards__item__link" to={props.path}>
          <figure className="cards__item__pic-wrap" data-category={props.label}>
            <img src={props.src} className="cards__item__img"> 
            </img>
          </figure>
          <div className="cards__item__info">
            <h2 className="cards_item_title">{props.title}</h2>
            <p className="cards__item__text">{props.text}</p>
          </div>
        </p>
      </li>
    </>
  )
}

export default CardItem
