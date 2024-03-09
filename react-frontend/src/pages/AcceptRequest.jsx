import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from "../http-common";
import { useParams } from 'react-router-dom';
// import { connect } from "react-redux";
// import { register } from "../../actions/auth";
import { Form } from 'react-bootstrap';

function AcceptRequest(props){
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [director, setDirector] = useState({});
  const [actor, setActor] = useState({});
  const [casting, setCasting] = useState({});
  const CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  function onChangecontent(e) {
    setContent(e.target.value);
  }
  function onChangedate(e) {
    setDate(e.target.value);
  }
  const navigate = useNavigate();
  
  const homenavigate = () => {
    alert("!")
    navigate('/', {replace: true});
  };
  
  function handleMessage(e) {
    // console.log([username, password, email, role, company])
    console.log([content, date])
     
    http
    .get(`/casting_request/${id}`)
    .then(response => {
        setCasting(response.data)
        var us = response.data.user;
        http
    .get(`/actorUser/${us.id}`)
    .then(response2 => {
        setActor(response2.data);
        http
        .get(`/directorUser/${CurrentUser.id}`)
        .then(response3 => {
            setDirector(response3.data);    
            var data = {"content": content, "date": date, "actor": actor, "director": director};
            console.log(data);
            http
                .post(`/create/message`, data)
                .then(response4 => {
                    console.log(response4.data);
                    homenavigate();
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
        <form onSubmit={handleMessage}>
          <div className="form-group mt-2">
            <input type="text" className="form-control" name="content" placeholder="Время и место" value={content} onChange={onChangecontent} required/>
          </div>
          <div>
                <div className="row">
                    <div className="col-md-4">
                        <Form.Group controlId="dob">
                            <Form.Label>Выберите дату</Form.Label>
                            <Form.Control type="date" name="dob" value={date} onChange={onChangedate} placeholder="Дата" />
                        </Form.Group>
                    </div>
                </div>
            </div>
          <div className="form-group mt-2">
            <button className="btn btn-primary btn-block">Отправить</button>
          </div>
        </form>
      </div> 
  );
}


export default AcceptRequest;