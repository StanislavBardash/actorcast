import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import http from "../http-common";

function EditCasting() {
  const CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams();
  const [candidat, setCandidat] = useState({});
  const [updatedCandidat, setUpdatedCandidat] = useState({});

  const [movie, setMovie] = useState({});
  const [updatedMovie, setUpdatedMovie] = useState({});

  const [casting, setCasting] = useState({});
  const [updatedCasting, setUpdatedCasting] = useState({});
const [actors, setActors] = useState([{}]);
const [castingRequests, setCastingRequests] = useState([{}]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCasting() {
      try {
        const response = await http.get("/casting/" + id);
        const castingData = response.data;

        // Initialize candidat, movie, and casting states with data from the response
        setCasting(castingData);
        setUpdatedCasting(castingData);
        setMovie(castingData.movie);
        setUpdatedMovie(castingData.movie);
        setCandidat(castingData.candidat);
        setUpdatedCandidat(castingData.candidat);
        
        setIsChecked(castingData.candidat.hasEducation);
      } catch (error) {
        console.log(error);
      }
    }

    if (!casting.title) {
      getCasting();
    }
  }, [id, casting.title]);
  async function deleteCasting(e) {
    e.preventDefault();
    // await http
    //       .get(`/casting_requests_by_casting/${casting.id}`)
    //       .then((response2) => {
    //         // console.log(response.data);
    //         response2.data.forEach(element=>{
    //            http
    //             .delete(`/delete/casting_request/${element.id}`)
    //             .then((response3) => {
    //               // console.log(response.data);
    //             })
    //             .catch((error) => {
    //               console.error('Error deleting casting_request:', error);
    //             });
    //         })
            
    //       })
    //       .catch((error) => {
    //         console.error('Error getting casting_request:', error);
    //       });
    await http
      .delete(`/delete/casting/${casting.id}`)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.error('Error deleting casting:', error);
      });
      await http
      .delete(`/delete/candidat/${casting.candidat.id}`)
      .then((response) => {
        navigate('/directorUser');
        
      })
      .catch((error) => {
        console.error('Error deleting candidat:', error);
      });
  }
  function handleUpdateProfile(e) {
    e.preventDefault();
    // Construct the updated user object
    // Send a request to update the user's profile
    http
      .post(`/update/movie/${movie.id}`, updatedMovie)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.error('Error updating movie:', error);
      });

    http
      .post(`/update/candidat/${candidat.id}`, updatedCandidat)
      .then((response) => {
        // console.log(response.data);
        navigate('/directorUser');
      })
      .catch((error) => {
        console.error('Error updating candidat:', error);
      });
    http
      .post(`/update/casting/${casting.id}`, updatedCasting)
      .then((response) => {
        // console.log(response.data);
        // console.log(casting.id);
        http
        .get("/casting_requests_by_casting/" + casting.id)
        .then(response5 => {
            console.log(response5.data)
            // обновление состояния
            setCastingRequests(response5.data);
            response5.data.forEach((element) => {
                console.log(element)
                http
                    .get("/actorUser/" + element.user.id)
                    .then(response6 => {
                        // обновление состояния        
                        var data = {
                            content: `Объявление на кастинг ${updatedCasting.title} было изменено`,
                            date: new Date(),
                            actor: response6.data,
                            director: casting.movie.director,
                            unread: true
                            };
                        http
                        .post(`/create/message`, data, { 'Content-Type': 'application/json' })
                        .then((response7) => {
                            console.log(response7.data);
                        })
                        .catch((error) => {
                            console.error('Error updating candidat:', error);
                        });         
                        });    
                    })
                    .catch(e => {
                        console.log(e);
                    });
        })  
        .catch(e => {
            console.log(e);
        });
        navigate('/directorUser');
      })
      .catch((error) => {
        console.error('Error updating casting:', error);
      });
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
    setUpdatedCandidat({ ...updatedCandidat, education: !isChecked});
  };
  return (
    <Container>
      <header>
        <h3>
          Кастинг: <strong>{casting.title}</strong>
        </h3>
      </header>
      <Form onSubmit={handleUpdateProfile}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="title">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              value={updatedCasting.title}
            onChange={e => setUpdatedCasting({ ...updatedCasting, title: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="description">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              type="text"
              value={updatedCasting.description}
              onChange={e => setUpdatedCasting({ ...updatedCasting, description: e.target.value })}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="role">
            <Form.Label>Роль</Form.Label>
            <Form.Control
              type="text"
              value={updatedCasting.role}
            onChange={e => setUpdatedCasting({ ...updatedCasting, role: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="deadline">
            <Form.Label>Дедлайн</Form.Label>
            <Form.Control
              type="date"
              value={updatedCasting.deadline}
              onChange={e => setUpdatedCasting({ ...updatedCasting, deadline: e.target.value })}
            />
          </Form.Group>
        </Row>
        <div>Потенциальный кандидат:</div>
        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Пол</Form.Label>
          <Form.Control
            type="text"
            value={updatedCandidat.gender}
            onChange={e => setUpdatedCandidat({ ...updatedCandidat, gender: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="education">
          <Form.Check
            type="checkbox"
            label="Наличие актерского образования?"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="keyFeatures">
          <Form.Label>Особенности</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={updatedCandidat.keyFeatures}
            onChange={e => setUpdatedCandidat({ ...updatedCandidat, keyFeatures: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="experience">
          <Form.Label>Опыт работы</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={updatedCandidat.experience}
            onChange={e => setUpdatedCandidat({ ...updatedCandidat, experience: e.target.value })}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Сохранить изменения
        </Button>
        <Button onClick={deleteCasting} variant="primary">
          Удалить
        </Button>
      </Form>
    </Container>
  );
}

export default EditCasting;