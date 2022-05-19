import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { Container, Button, Icon, Image, Item, Label } from "semantic-ui-react";
import "./TreinosList.css";
import {AiOutlinePlus} from 'react-icons/ai';

export default function TreinosList(props) {
  const { ID_TREINO, DS_TREINO, OBS_TREINO, DS_NOME} = props.treino;
  let history = useHistory();

    const redirect = () => {
        history.push(`/treino/${ID_TREINO}`);
    }
  return (
    <div className='treino-item'>
      <Item.Group divided unstackable>
                <Item>
                    <Item.Content>
                        <Item.Header>{DS_TREINO}</Item.Header>
                        <Item.Meta>{DS_NOME}</Item.Meta>
                        <Item.Description>{OBS_TREINO}</Item.Description>
                        <Item.Extra>
                            <Button primary floated="right" onClick={redirect}>Detalhes <Icon name="right chevron" /></Button>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>
    </div>
  );
}