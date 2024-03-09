import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import http from "../http-common";

function Edit() {
  const CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [isChecked, setIsChecked] = useState(false);

  
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [age, setAge] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('');
  const [actingExperience, setActingExperience] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [hasEducation, setHasEducation] = useState(false);
  const [actor, setActor] = useState({});
  const [updatedActor, setUpdatedActor] = useState({});
  const [director, setDirector] = useState({});
  const [updatedDirector, setUpdatedDirector] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    function getActor() {
        http
            .get("/actorUser/" + CurrentUser.id)
            .then(response => {
                // обновление состояния
                setActor(response.data);
                setUpdatedActor(response.data);
                setIsChecked(actor.hasEducation);
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
                    setUpdatedDirector(response.data);
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
  });

  function handleUpdateProfile(e) {
    e.preventDefault();
    // Construct the updated user object
    
    if (CurrentUser.role === "worker"){
    // Send a request to update the user's profile
    http
      .post(`/update/actor/${actor.id}`, updatedActor)
      .then((response) => {
        console.log(response.data);
        navigate('/profile');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
    }
    else{
        http
      .post(`/update/director/${director.id}`, updatedDirector)
      .then((response) => {
        console.log(response.data);
        navigate('/profile');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
    }
  }
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
    setUpdatedActor({ ...updatedActor, hasEducation: !isChecked});
  };
  return (
    <Container>
      <header>
        <h3>
          Профиль <strong>{CurrentUser.username}</strong>
        </h3>
      </header>
      {
      CurrentUser.role === "worker"
      ?
      <Form onSubmit={handleUpdateProfile}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              value={updatedActor.firstName}
            onChange={e => setUpdatedActor({ ...updatedActor, firstName: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="secondName">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              value={updatedActor.secondName}
              onChange={e => setUpdatedActor({ ...updatedActor, secondName: e.target.value })}
              required
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Возраст</Form.Label>
          <Form.Control
            type="number"
            value={updatedActor.age}
            onChange={e => setUpdatedActor({ ...updatedActor, age: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="keyFeatures">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={updatedActor.keyFeatures}
            onChange={e => setUpdatedActor({ ...updatedActor, keyFeatures: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="actingExperience">
          <Form.Label>Опыт работы</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={updatedActor.actingExperience}
            onChange={e => setUpdatedActor({ ...updatedActor, actingExperience: e.target.value })}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="height">
            <Form.Label>Рост, см</Form.Label>
            <Form.Control
              type="number"
              value={updatedActor.height}
              onChange={e => setUpdatedActor({ ...updatedActor, height: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="weight">
            <Form.Label>Вес, кг</Form.Label>
            <Form.Control
              type="number"
              value={updatedActor.weight}
              onChange={e => setUpdatedActor({ ...updatedActor, weight: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="hasEducation">
          <Form.Check
            type="checkbox"
            label="Есть ли у вас актерское образование?"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Сохранить изменения
        </Button>
      </Form>
      :
      <Form onSubmit={handleUpdateProfile}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              value={updatedDirector.firstName}
            onChange={e => setUpdatedDirector({ ...updatedDirector, firstName: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              value={updatedDirector.lastName}
              onChange={e => setUpdatedDirector({ ...updatedDirector, lastName: e.target.value })}
              required
            />
          </Form.Group>
        </Row>
        <Button type="submit" variant="primary">
          Сохранить изменения
        </Button>
        </Form>
        }
    </Container>
  );
}

export default Edit;