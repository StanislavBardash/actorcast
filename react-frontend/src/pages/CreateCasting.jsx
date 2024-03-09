import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../http-common';
// import { connect } from "react-redux";
// import { register } from "../../actions/auth";
import { Form } from 'react-bootstrap';
function CreateCasting(){

  const [movietitle, setmovietitle] = useState("");

  const [moviedescription, setmoviedescription] = useState("");

  const [date, setdate] = useState("");

  const [genre, setgenre] = useState("");

  const [role, setrole] = useState("");

  const [description, setdescription] = useState("");

  const [title, settitle] = useState("");

  const [city, setcity] = useState("");

  const [has_education, setHasEducation] = useState("false");


  const [dead, setdead] = useState("");

  const [gender, setgender] = useState("");

  const [experience, setexperience] = useState("");

  const [key_features, setkey_features] = useState("");
  const [director, setDirector] = useState({});



  function onChangemovietitle(e) {
    setmovietitle(e.target.value);
  }
  const navigate = useNavigate();
  function onChangemoviedescription(e) {
    setmoviedescription(e.target.value);
  }
  function onChangedate(e) {
    setdate(e.target.value);
  }
  const homenavigate = () => {
    alert("Вы успешно зарегистрированы!")
    navigate('/', {replace: true});
  };
  const onChangegenre = (event) => {
    setgenre(event.target.value);
  };

  const onChangerole = (event) => {
    setrole(event.target.value);
  };

  function onChangedescription(e) {
    setdescription(e.target.value);
  }

  function onChangetitle(e) {
    settitle(e.target.value);
  }

  function onChangecity(e) {
    setcity(e.target.value);
  }

  function onChangedead(e) {
    setdead(e.target.value);
  }

  function onChangegender(e) {
    setgender(e.target.value);
  }

  function onChangeexperience(e) {
    setexperience(e.target.value);
  }
  function onChangekey_features(e) {
    setkey_features(e.target.value);
  }
  function onChangehas_education(e) {
    setHasEducation(!has_education);
  }

  const CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  function handleCreation(e) {
    e.preventDefault();

    http.get(`/directorUser/${CurrentUser.id}`)
      .then(response => {
        const director = response.data;
        const movieData = {
          title: movietitle,
          description: moviedescription,
          releaseDate: date,
          genre: genre,
          director: director
        };

        http.post(`/create/movie/`, movieData)
          .then(response1 => {
            const candidatData = {
              education: has_education,
              experience: experience,
              gender: gender,
              keyFeatures: key_features,
              director: director
            };

            http.post(`/create/candidat/`, candidatData)
              .then(response2 => {
                const castingData = {
                  movie: response1.data,
                  role: role,
                  description: description,
                  title: title,
                  city: city,
                  deadline: dead,
                  candidat: response2.data
                };

                http.post(`/create/casting`, castingData, { 'Content-Type': 'application/json' })
                  .then(response3 => {
                    console.log(response3.data);
                    navigate('/'); // Redirect to the home page after successful creation
                  })
                  .catch(e => {
                    console.log(e);
                  });
              })
              .catch(e => {
                console.log(e);
              });
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
      });
  }


return (
      <div className="col-md-5">
        <h1>Создайте свое объявление!</h1>
        <form onSubmit={handleCreation}>
          <div className="form-group mt-2">
            <input type="text" className="form-control" name="movietitle" placeholder="Название фильма" value={movietitle} onChange={onChangemovietitle} required/>
          </div>
          <div className="form-group mt-2">
            <input type="text" className="form-control" name="moviedescription" placeholder="Описание фильма" value={moviedescription} onChange={onChangemoviedescription} required/>
          </div>
          <div className="row">
                    <div className="col-md-4">
                        <Form.Group controlId="dob">
                            <Form.Label>Дата выхода</Form.Label>
                            <Form.Control type="date" name="dob" value={date} onChange={onChangedate} placeholder="Дата" />
                        </Form.Group>
                    </div>
                </div>


          <div className="form-group mt-2">
            <input type="text" className="form-control" name="genre" placeholder="Жанр фильма" value={genre} onChange={onChangegenre} required/>
          </div>

          <div className="form-group mt-2">
            <input type="text" className="form-control" name="role" placeholder="роль" value={role} onChange={onChangerole} required/>
          </div>
          
          <div className="form-group mt-2">
            <input type="text" className="form-control" name="description" placeholder="Описание объявления" value={description} onChange={onChangedescription} required/>
          </div>

          <div className="form-group mt-2">
            <input type="text" className="form-control" name="title" placeholder="Заголовок объявления" value={title} onChange={onChangetitle} required/>
          </div>

          <div className="form-group mt-2">
            <input type="text" className="form-control" name="city" placeholder="Город проведения" value={city} onChange={onChangecity} required/>
          </div>

          <div className="row">
                    <div className="col-md-4">
                        <Form.Group controlId="dead">
                            <Form.Label>Дедлайн</Form.Label>
                            <Form.Control type="date" name="dead" value={dead} onChange={onChangedead} placeholder="Дедлайн" />
                        </Form.Group>
                    </div>
                </div>
    <div>Потенциальный кандидат:</div>
            <div className="form-group mt-2">
            <input type="text" className="form-control" name="gender" placeholder="Пол" value={gender} onChange={onChangegender} required/>
          </div>
          <div className="form-group mt-2">
  <label>
    <input
      type="checkbox"
      name="hasEducation"
      // checked={has_education}
      onChange={onChangehas_education}
    />
    Обязательное наличие образования
  </label>
</div>
          <div className="form-group mt-2">
            <input type="text" className="form-control" name="experience" placeholder="Опыт работы" value={experience} onChange={onChangeexperience} />
          </div>

          <div className="form-group mt-2">
            <input type="text" className="form-control" name="key_features" placeholder="Ключевые особенности" value={key_features} onChange={onChangekey_features} />
          </div>
          
        
          <div className="form-group mt-2">
            <button className="btn btn-primary btn-block">Отправить</button>
          </div>
        </form>
      </div> 
  );
}


export default CreateCasting;