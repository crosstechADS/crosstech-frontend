import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import '../../App.css'
import { Button, Segment, Icon, Input } from 'semantic-ui-react';
import './Treinos.css'
import { useEffect, useState } from 'react';
import Api from '../../config/Api';
import TreinosList from '../../components/TreinosList'
import Loading from '../../components/Loading';
import { useTranslation } from 'react-i18next';

function Treinos() {
  let history = useHistory();
  const { t } = useTranslation();

  const redirect = () => {
    history.push('../treinoregister')
  }

  const [removeLoading, setRemoveLoading] = useState(false);
  const [treinos, setTreinos] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    Api.get(`/treinosSelect`).then((response) => {
      setTreinos(response.data);
      setRemoveLoading(true);
    })
  }, []);

  return (
    <div>
      <h1>{t('Treinos')}</h1>
      <div className='treinos-action'>
        <Button className='treinos-button' onClick={redirect} content={t('Criar Treino')} basic size='large' />

        <Input
          type="text" size='large'
          className='treinos-search ui'
          icon={<Icon name='search' circular link />}
          placeholder={t("Procurar exercício")}
          onChange={(event) => { setSearchItem(event.target.value); }}>
        </Input>
      </div>

      <div className='treinos-container'>
        {typeof treinos !== "undefined" && treinos.filter((value) => {
          if (searchItem == "") {
            return value;
          } else if (value.DS_TREINO.toLowerCase().includes(searchItem.toLowerCase())) {
            return value;
          }
        }).filter((value) => {
          if (value.DT_EXCLUSAO === null) {
            return value;
          }
        }).map((value) => {
          return <TreinosList key={value.ID_TREINO}
            listCard={treinos} setListCard={setTreinos}
            treino={value} />
        })}
        {!removeLoading && <Loading />}
      </div>
    </div>
  )
}

export default Treinos
