import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { Container, Button, Icon, Image, Item, Label } from "semantic-ui-react";
import { AiOutlinePlus } from 'react-icons/ai';
import "./ExerciciosItem.css"
import { useTranslation } from 'react-i18next';

export default function ExerciciosItem(props) {
    let history = useHistory();
    const { t } = useTranslation();
    const redirect = () => {
        history.push(`/exercicio/${ID_EXERCICIO}`);
    }

    const { ID_EXERCICIO, DS_EXERCICIO, OBS_EXERCICIO, DS_MIDIA_URL, DS_TIPO_EXERCICIO } = props.exercicio;
    return (
        <div className="exercicio-item">
            <Item.Group divided unstackable>
                <Item>
                    <Item.Image src={DS_MIDIA_URL} />

                    <Item.Content>
                        <Item.Header>{DS_EXERCICIO}</Item.Header>
                        <Item.Description>{OBS_EXERCICIO}</Item.Description>
                        <Item.Extra>
                            <Button primary floated="right" onClick={redirect}>{t('Detalhes')} <Icon name="right chevron" /></Button>
                            <Label>{DS_TIPO_EXERCICIO}</Label>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>
        </div>
    );
}