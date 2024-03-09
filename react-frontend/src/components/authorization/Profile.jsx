import React, { useState, useEffect }  from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { ListGroup} from 'react-bootstrap';
import http from '../../http-common';
function Profile(props){
    const CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [actor, setActor] = useState({});
    const [director, setDirector] = useState({});
    useEffect(() => {
        function getActor() {
            http
                .get("/actorUser/" + CurrentUser.id)
                .then(response => {
                    // обновление состояния
                    setActor(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            }

        function getDirector() {
            http
                .get("/directorUser/" + CurrentUser.id)
                .then(response => {
                    // обновление состояния
                    setDirector(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            }
            if (!actor.firstName){
                getActor();
            }
            if (!director.firstName){
                getDirector();
            }
        })
    return (
      <div className="container">
        <header>
          <h3>
            Профиль <strong>{CurrentUser.username}</strong>
          </h3>
        </header>
        {CurrentUser.role == "worker"?
        <Container>
          <ListGroup>
            <ListGroup.Item><h3>{actor.firstName} {actor.secondName}</h3></ListGroup.Item>
            <ListGroup.Item>Почта: {CurrentUser.email}</ListGroup.Item>
            <ListGroup.Item>Возраст: {actor.age}</ListGroup.Item>
            <ListGroup.Item>Описание: {actor.keyFeatures}</ListGroup.Item>
            <ListGroup.Item>Опыт работы: {actor.actingExperience}</ListGroup.Item>
            <ListGroup.Item>О себе: {actor.keyFeatures}</ListGroup.Item>
            <ListGroup.Item>Рост, см: {actor.height}</ListGroup.Item>
            <ListGroup.Item>Вес, кг: {actor.weight}</ListGroup.Item>
            {actor.hasEducation
              ? <ListGroup.Item>Закончил(a) актерский факультет</ListGroup.Item>
              : <ListGroup.Item>Актерское образование отсутствует</ListGroup.Item>
            }
          </ListGroup>
          <Button href={`/edit_profile`}>Редактировать</Button>
          <Button href={`/requests_for_user`}>Мои отправленные заявки</Button>
          </Container>
          :
          
          <Container>
          <ListGroup>
            <ListGroup.Item><h3>{director.firstName} {director.lastName}</h3></ListGroup.Item>
            <ListGroup.Item>Почта: {CurrentUser.email}</ListGroup.Item>
          </ListGroup>
          <Button href={`/edit_profile`}>Редактировать</Button>
          <Button href={`/requests`}>Заявки на кастинг</Button>
          <Button href={`/directorUser`}>Мои объявления</Button>
          </Container>
          }
          
      </div>
    );
  }



export default Profile;