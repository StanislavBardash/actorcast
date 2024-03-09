import React, { useState, useEffect }  from 'react';
import {Link} from "react-router-dom";
import http from "../http-common";
import { useNavigate } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { Button, Container, ListGroup, Form, Row, Col} from 'react-bootstrap';
function UserRequested() {
    const CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    // useParams позволяет получить параметры из url
    const { id } = useParams();
    // const [content, setContent] = useState("");
    const [actor, setActor] = useState({});
    const [user_request, setUserRequest] = useState({});
    const [user, setUser] = useState({});
    const [textareaValue, setTextareaValue] = useState("");
    const navigate = useNavigate();
    // Объявление состояния
    // category хранит состояние (имя задаётся разработчиком)
    // setCategory позволяет состояние изменять (имя задаётся разработчиком)


    

    // Объявление состояния
    // const [submitted, setSubmitted] = useState(false);

    // хук useEffect - аналог componentDidMount
    useEffect(() => {
        function getUserRequest(){
            http
                .get("/casting_request/" + id)
                .then(response => {
                    // обновление состояния
                    setUserRequest(response.data);
                    
                    setUser(response.data.user);
                    var us = response.data.user;
                    http
                        .get("/actorUser/" + us.id)
                        .then(response2 => {
                            // обновление состояния
                            setActor(response2.data);
                        })  
                        .catch(e => {
                            console.log(e);
                        });
                    
                    
                })  
                .catch(e => {
                    console.log(e);
                });
            
        }
        function getActor() {
            
            }
            
            if (!user_request.content){
                getUserRequest();
                getActor();
                // console.log(casting);
            }
            

      })
      const goAway = (e) =>{
        e.preventDefault()
        const data = {
            content: `Отказ на кастинг '${user_request.casting.title}'!\n `+textareaValue,
            date: new Date(),
            actor: actor,
            director: user_request.casting.movie.director,
            unread: true
        };
        http
            .post(`/create/message`, data)
            .then(response => {
                // обновление состояния
                console.log(response.data);
                http
                .delete(`/delete/casting_request/${user_request.id}`)
                .then(response2 => {
                    // обновление состояния
                    console.log(response2.data);
                    navigate('/profile', {replace: true});
                })  
                .catch(e => {
                    console.log(e);
                });
            })  
            .catch(e => {
                console.log(e);
            });
        
      }
      const accept = (e) =>{
        e.preventDefault()
        const data = {
            content: `Поздравляем.Вас приняли на кастинг '${user_request.casting.title}'! \n`+textareaValue,
            date: new Date(),
            actor: actor,
            director: user_request.casting.movie.director,
            unread: true
        };
        http
            .post(`/create/message`, data)
            .then(response => {
                // обновление состояния
                console.log(response.data);
                http
                .delete(`/delete/casting_request/${user_request.id}`)
                .then(response2 => {
                    // обновление состояния
                    console.log(response2.data);
                    navigate('/profile', {replace: true});
                })  
                .catch(e => {
                    console.log(e);
                    console.error(e);
                });
            })  
            .catch(e => {
                console.log(e);
            });
        
      }

    return (
        <Container>
          <ListGroup>
            <ListGroup.Item>
                <Link to={`/actor/${actor.id}`}>
                        <div style={{ textAlign: "left" }}>
                            {actor.firstName} {actor.lastName}
                          </div>
                </Link>
                
            </ListGroup.Item>
            
            <ListGroup.Item>Письмо: {user_request.content}</ListGroup.Item>
            {/* <ListGroup.Item>
                <Button variant="danger" onClick={goAway} >Отказать</Button>{' '}</ListGroup.Item> */}
            </ListGroup>
            <></>
            {CurrentUser.role==="employer"?
            <Form>
                <div>Напишите Ответ:</div>
                <Form.Group>
                    
                    <textarea
                    name="postContent"
                    rows={8}
                    cols={80}
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    
            <Button onClick={accept}>Принять</Button>
            <Button onClick={goAway}>Отказать</Button>
                    
            </Form.Group>
            </Form>
            :<div></div>}
          </Container>

          

      );
}

export default UserRequested;