import React, { useState, useEffect }  from 'react';
import Image from 'react-bootstrap/Image';
import http from "../http-common";
import { Navigate, useParams } from 'react-router-dom';
import { Container, ListGroup, Card, Form, Button} from 'react-bootstrap';
function Actor() {
    const CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    // useParams позволяет получить параметры из url
    const { id } = useParams();
    // Объявление состояния
    // category хранит состояние (имя задаётся разработчиком)
    // setCategory позволяет состояние изменять (имя задаётся разработчиком)
    const [actor, setActor] = useState({}); // useState - стандартный метод для определения начального состояния
    const [reviews, setReviews] = useState([]);
    const [director, setDirector] = useState('');
    const [movies, setMovies] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(3);
    const [movie, setMovie] = useState('');
    const [currentRating, setCurrentRating] = React.useState(0);
    const [potentialRating, setPotentialRating] = React.useState(0);
    const handleCommentChange = (event) => {
        setComment(event.target.value);
      };
    
      const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
      };
    
      const handleMovieChange = (event) => {
        setMovie(event.target.value);
      };

    // Объявление состояния
    // const [submitted, setSubmitted] = useState(false);

    // хук useEffect - аналог componentDidMount
    useEffect(() => {
        function getActor() {
            http
                .get("/actor/" + id)
                .then(response => {
                    // обновление состояния
                    setActor(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            }
            function getReviews() {
                http
                    .get("/actorreviews/" + id, {'Content-Type': 'application/json'})
                    .then(response => {
                        // обновление состояния
                        setReviews(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
                }
            function getDirector() {
                http
                    .get("/directorUser/" + CurrentUser.id, {'Content-Type': 'application/json'})
                    .then(response => {
                        // обновление состояния
                        console.log(response.data);
                        setDirector(response.data);
                        http
                            .get("/movieDirector/" + response.data.id, {'Content-Type': 'application/json'})
                            .then(response2 => {
                                // обновление состояния
                                setMovies(response2.data);
                            })
                            .catch(e => {
                                console.log(e);
                            });
                    })
                    .catch(e => {
                        console.log(e);
                    });
                }
            // function getMoviesForDirector() {  
                
            //     }
            if (!actor.firstName){
                getDirector();
                getActor();
                
                // getMoviesForDirector();
                getReviews();

                
            }
            

      })

      
      const handleSubmit = (event) => {
        event.preventDefault();
            var data = {"actor":actor, "director": director, "movie": null, "rating": currentRating, "comment": comment, "date": new Date()}
            http
            .post("/create/review", data, {'Content-Type': 'application/json'})
            .then(response2 => {
                // обновление состояния
                window.location.reload();
                
            })
            .catch(e => {
                console.log(e);
            });
        
        
        console.log(comment, rating, movie); // Replace with your own logic to handle the comment submission
        
        
        
      };

      const movieOptions = movies.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ));
      const DEFAULT = '🙂';
      const SELECTED = '🤩';
      
      function Rating() {
        
      
        function onMouseEnter(event) {
          event.preventDefault();
          const position = event.target.getAttribute('position');
          setPotentialRating(position);
        }
        
        function chooseIcon(position) {
          if (currentRating >= position || potentialRating >= position) {
            return SELECTED;
          }
          return DEFAULT;
        }
        
        function onMouseLeave() {
          setPotentialRating(0);
        }
        
        function onClick(event) {
          event.preventDefault();
          const position = event.target.getAttribute('position');
          if (currentRating === position) {
            setCurrentRating(0);
          } else {
            setCurrentRating(position);
          }
        }
        
        function onKeyPress(event) {
          onClick(event)
        }
        return (
          <span onMouseLeave={onMouseLeave}>
            <span tabIndex="0" onKeyPress={onKeyPress} onMouseEnter={onMouseEnter} onClick={onClick} position={1}>{chooseIcon(1)}</span>
            <span tabIndex="0" onMouseEnter={onMouseEnter} onClick={onClick} position={2}>{chooseIcon(2)}</span>
            <span tabIndex="0" onMouseEnter={onMouseEnter} onClick={onClick} position={3}>{chooseIcon(3)}</span>
            <span tabIndex="0" onMouseEnter={onMouseEnter} onClick={onClick} position={4}>{chooseIcon(4)}</span>
            <span tabIndex="0" onMouseEnter={onMouseEnter} onClick={onClick} position={5}>{chooseIcon(5)}</span>
          </span>
        );
      }
      
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <Container>
          
          <ListGroup>
          <ListGroup.Item><Image style={{textAlign:'center'}}width={150} src='https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg' roundedCircle /></ListGroup.Item>
            <ListGroup.Item><h3>{actor.firstName} {actor.secondName}</h3></ListGroup.Item>
            {/* <ListGroup.Item>Почта: {actor.user.email}</ListGroup.Item> */}
            <ListGroup.Item>Возраст: {actor.age}</ListGroup.Item>
            {/* <ListGroup.Item>Описание: {actor.keyFeatures}</ListGroup.Item> */}
            <ListGroup.Item>Опыт работы: {actor.actingExperience}</ListGroup.Item>
            <ListGroup.Item>О себе: {actor.keyFeatures}</ListGroup.Item>
            <ListGroup.Item>Рост, см: {actor.height}</ListGroup.Item>
            <ListGroup.Item>Вес, кг: {actor.height}</ListGroup.Item>
            {actor.hasEducation
              ? <ListGroup.Item>Закончил(a) актерский факультет</ListGroup.Item>
              : <ListGroup.Item>Актерское образование отсутствует</ListGroup.Item>
            }
          </ListGroup>
          <Card>
    <Card.Header>Отзывы</Card.Header>
    
    <Card.Body>
    {reviews.map((review, index) => (
        <div key={index} className="comment">
            <p>{review.comment}</p>
            <p>
            <span>{review.rating} звезд!</span>
            </p>
            <p>
            <span>{review.director.firstName} {review.director.lastName}</span>
            <div></div>
            <span>{new Date(review.date).toLocaleDateString('ru-RU', options)}</span>
            </p>
            {/* <p>
            <span>В фильме <strong>{review.movie.title}</strong></span>
            </p> */}
            <div>---------------------------------</div>
        </div>
        
      ))}
      {CurrentUser.role === "employer"?
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formComment">
          <Form.Label>Добавить комментарий</Form.Label>
          <Form.Control as="textarea" rows={10} cols={10} value={comment} onChange={handleCommentChange} />
        </Form.Group>
        <Form.Group controlId="formRating">
          {/* <Form.Label>Оценка</Form.Label>
          <Form.Control type="number" min="1" max="5" value={rating} onChange={handleRatingChange} /> */}
          <Rating />
        </Form.Group>
        
        {/* <Form.Group controlId="formMovie">
          <Form.Label>Фильм</Form.Label>
          <Form.Control as="select" value={movie} onChange={handleMovieChange}>
            <option value="">Выберите фильм</option>
            {movies.map((movie) => (
        <option key={movie.id} value={movie.id}>
          {movie.title}
        </option>
                ))}
          </Form.Control>
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Отправить
        </Button>
      </Form>
      :
      <div></div>}
    </Card.Body>
  </Card>
          </Container>
          

      );
}

export default Actor;