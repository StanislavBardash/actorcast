
import React, { useState }  from 'react';
import {Link } from 'react-router-dom';
import http from '../../http-common';
import { useNavigate } from 'react-router-dom';
// import { connect } from "react-redux";
// import { login } from "../../actions/auth";

function Login(props){
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(undefined);
  const [message, setMessage] = useState("");

  function onChangeUsername(e) {
    setUsername(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  const homenavigate = () => {
    navigate('/', {replace: true});
    window.location.reload();
  };
  function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    http
    .get(`/findUser/${username}/${password}`)
    .then(response => {
        // обновление состояния
        if (response.data.length != 0){
          setLoading(false);
          localStorage.setItem("currentUser",JSON.stringify(response.data));
          homenavigate();
        }
        else{
          setLoading(false);
          alert("Неправильный логин и/или пароль!")
          window.location.reload();
          
        }
    })
    .catch(e => {
        console.log(e);
    });



    // const { dispatch } = props;

    // dispatch(login(username, password))
    //   .then(() => {
    //     window.location.reload();
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  }

  // const { isLoggedIn, message } = props;
  // if (isLoggedIn) {
  //   return <Navigate to="/profile" />;
  // }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div className="col-md-5">
      <form onSubmit={handleLogin}>
        <div className="form-group mt-2">
          <input type="text" className="form-control" name="username" placeholder="Логин" value={username} onChange={onChangeUsername} required/>
        </div>
        <div className="form-group mt-2">
          <input type="password" className="form-control" name="password" placeholder="Пароль" value={password} onChange={onChangePassword} required/>
        </div>

        <div className="form-group mt-2">
          <button className="btn btn-primary btn-block" disabled={loading} >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Войти</span>
          </button>
        </div>
        <div className="form-group mt-2">
          <Link to={`/register`}>
            Зарегистрироваться
          </Link>
        </div>
        {/* {message && loading !== undefined && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )} */}
      </form>
      <div>{message}</div>
    </div>
    </div>
  );
}

// функциональность Redux: позволяет передать на перенаправляемую страницу данные (в данном случае передаются данные на страницу профиля)
// function mapStateToProps(state) {
//   const { isLoggedIn } = state.auth;
//   const { message } = state.message;
//   return {
//     isLoggedIn,
//     message
//   };
// }

export default Login;