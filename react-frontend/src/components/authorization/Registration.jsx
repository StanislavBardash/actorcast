import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../http-common';
// import { connect } from "react-redux";
// import { register } from "../../actions/auth";

function Register(props){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState('worker');
  const [company, setCompany] = useState('');
  const [successful, setSuccessful] = useState(undefined);
  function onChangeUsername(e) {
    setUsername(e.target.value);
  }
  const navigate = useNavigate();
  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  const homenavigate = () => {
    alert("Вы успешно зарегистрированы!")
    navigate('/', {replace: true});
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };
  function handleRegister(e) {
    e.preventDefault();

    http
      .get(`/findUser/${username}/${password}`)
      .then(response => {
        if (response.data.length === 0) {
          var data = {
            "username": username,
            "password": password,
            "email": email,
            "organization": company,
            "verified": 0,
            "role": role
          };
          return http.post(`/create/user`, data, { 'Content-Type': 'application/json' });
        } else {
          alert("Такой пользователь уже есть!");
          throw new Error("User already exists");
        }
      })
      .then(response => {
        console.log(response.data);
        homenavigate();
      })
      .catch(error => {
        console.log(error);
      });
  }


return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="col-md-5">
        <form onSubmit={handleRegister}>
          <div className="form-group mt-2">
            <input type="text" className="form-control" name="username" placeholder="Логин" value={username} onChange={onChangeUsername} required/>
          </div>
          <div className="form-group mt-2">
            <input type="password" className="form-control" name="password" placeholder="Пароль" value={password} onChange={onChangePassword} required/>
          </div>
          <div className="form-group mt-2">
            <input type="email" className="form-control" name="email" placeholder="email" value={email} onChange={onChangeEmail} required/>
          </div>
          <div>Выберите роль</div>
          <div className="form-group mt-2">
            <input
                    type="radio"
                    id="worker"
                    name="role"
                    value="worker"
                    checked={role === 'worker'}
                    onChange={handleRoleChange}
                    />
                    <label htmlFor="worker">Worker</label>
                <input
            type="radio"
            id="employer"
            name="role"
            value="employer"
            checked={role === 'employer'}
            onChange={handleRoleChange}
            />
            <label htmlFor="employer">Employer</label>
            </div>

        {role === 'employer' && (

              <div className="form-group mt-2">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={company}
                  onChange={handleCompanyChange}
                  placeholder="Enter your company name"
                />
              </div>
        )}
          <div className="form-group mt-2">
            <button className="btn btn-primary btn-block">Зарегистрировать</button>
          </div>
        </form>
      </div>
      </div> 
  );
}


export default Register;