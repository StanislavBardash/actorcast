import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import http from "../http-common";
import { useParams } from 'react-router-dom';

function CastingRequest(){
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [casting, setCasting] = useState({});
  const CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  function onChangecontent(e) {
    setContent(e.target.value);
  }
  const navigate = useNavigate();
  
  const homenavigate = () => {
    alert("!")
    navigate('/', {replace: true});
  };
  useEffect(() => {
    // Fetch casting details when the component mounts
    http.get(`/casting/${id}`)
      .then(response => {
        setCasting(response.data);
      })
      .catch(error => {
        console.error('Error fetching casting details:', error);
      });
  }, [id]);
  function handleReq(e) {
    // console.log([username, password, email, role, company])
    e.preventDefault();
    const requestData = {
      content: content,
      casting: casting,
      user: CurrentUser
    };
    http.post(`/create/casting_request`, requestData)
      .then(response => {
        console.log('Casting request created:', response.data);
        navigate('/', { replace: true });
      })
      .catch(error => {
        console.error('Error creating casting request:', error);
      });
    
  }


return (
      <div className="col-md-5">
        <form onSubmit={handleReq}>
          <div className="form-group mt-2">
          <textarea 
    rows={10} 
    cols={50} 
    className="form-control" 
    name="content" 
    placeholder="Напишите мотивационное письмо" 
    value={content} 
    onChange={onChangecontent} 
    required
  />
          </div>
          
          <div className="form-group mt-2">
            <button className="btn btn-primary btn-block">Отправить</button>
          </div>
        </form>
      </div> 
  );
}


export default CastingRequest;