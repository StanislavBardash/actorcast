import React, { useState, useEffect }  from 'react';

import http from "../http-common";
import { Navigate, useParams } from 'react-router-dom';
import { Button, Container, ListGroup} from 'react-bootstrap';
function Casting() {
    const CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    // useParams позволяет получить параметры из url
    const { id } = useParams();
    const [candidat, setCandidat] = useState({});
    const [casting, setCasting] = useState({});
    
    // Объявление состояния
    // category хранит состояние (имя задаётся разработчиком)
    // setCategory позволяет состояние изменять (имя задаётся разработчиком)


    

    // Объявление состояния
    // const [submitted, setSubmitted] = useState(false);

    // хук useEffect - аналог componentDidMount
    useEffect(() => {
        function getCasting() {
            http
                .get("/casting/" + id)
                .then(response => {
                    // обновление состояния
                    setCasting(response.data);
                    setCandidat(response.data.candidat);
                    
                })  
                .catch(e => {
                    console.log(e);
                });
            }
            
            if (!casting.description){
                getCasting();
                // console.log(casting);
            }
            

      })

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <Container>
          <ListGroup>
            <ListGroup.Item><h3>{casting.title}</h3></ListGroup.Item>
            
            <ListGroup.Item>Описание: {casting.description}</ListGroup.Item>
            <ListGroup.Item>Роль: {casting.role}</ListGroup.Item>

            {/* <ListGroup.Item>В фильме: {casting.movie.title}</ListGroup.Item> */}
            {/* <ListGroup.Item>Описание фильма: {casting.movie.description}</ListGroup.Item> */}
            {/* <ListGroup.Item>Жанр фильма: {casting.movie.genre}</ListGroup.Item> */}
            {/* <ListGroup.Item>Работодатель: {casting.movie.director.firstName} {casting.movie.director.lastName}</ListGroup.Item>
            <ListGroup.Item>Рабочая почта: {casting.movie.director.user.email}</ListGroup.Item> */}
            <ListGroup.Item>Отправить заявку нужно не позднее: {new Date(casting.deadline).toLocaleDateString('ru-RU', options)}</ListGroup.Item>
            <ListGroup.Item>Потенциальный кандидат:
                <div>
                 Пол: {candidat.gender}
                 </div>
                 <div>
                 Образование: {candidat.education?
                  <div>Необходимо</div>:
                  <div>Не требуется</div>
                 }
                 </div>
                 <div>
                 Опыт работы: {candidat.experience}
                 </div>
                 <div>
                 Особенности: {candidat.keyFeatures}
                 </div>
                 </ListGroup.Item>
                 
          </ListGroup>

          {CurrentUser.role == "worker" && CurrentUser.verified?
                 <Button href={`/castingrequest/${casting.id}`}>Записаться на кастинг</Button>:
                 <div></div>
        }
          </Container>
        //   <div>
        //   {CurrentUser.role == "worker"?
        //          <Button href="/castingrequest">Записаться на кастинг</Button>:
        //          <div></div>
        // }
        // </div>
          

      );
}

export default Casting;