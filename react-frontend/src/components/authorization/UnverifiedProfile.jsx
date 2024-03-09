import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../http-common';

function UnverifiedProfile(){
    const CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [firstName, setfirstName] = useState("");
    const [secondName, setsecondName] = useState("");
    const [age, setage] = useState('');
    const [gender, setgender] = useState("");
    const [experience, setexperience] = useState("");
    const [isActor, setisActor] = useState(false);
    const [key_features, setkey_features] = useState("");
    const [height, setheight] = useState('');
    const [weight, setweight] = useState('');
    useEffect(() => {
      if (CurrentUser && CurrentUser.verified) {
        localStorage.setItem('currentUser', JSON.stringify(CurrentUser));
      }
    }, [CurrentUser]);

    function onChangefirstName(e) {
        setfirstName(e.target.value);
      }
      const navigate = useNavigate();
      function onChangesecondName(e) {
        setsecondName(e.target.value);
      }
      function onChangeage(e) {
        setage(e.target.value);
      }
      const homenavigate2 = () => {
        navigate('/', {replace: true});
      };
      const handleGenderChange = (event) => {
        setgender(event.target.value);
      };
    
      const onChangeexperience = (event) => {
        setexperience(event.target.value);
      };

      const handleCheck = (event) => {
          setisActor(event.target.checked);
      };

      const onChangekey_features = (event) => {
        setkey_features(event.target.value);
      };

      const onChangeheight = (event) => {
        setheight(event.target.value);
      };

      const onChangeweight = (event) => {
        setweight(event.target.value);
      };
    // if (!CurrentUser) {
    //   return <Navigate to="/login" />;
    // }
    function handleVerify(e) {
      e.preventDefault();

      const data = {
        user: CurrentUser,
        gender: gender,
        firstName:firstName,
        secondName: secondName,
        age: parseInt(age),
        height: parseInt(height),
        weight: parseInt(weight),
        keyFeatures: key_features,
        actingExperience: experience,
        hasEducation: isActor,
      };
  
      http.post(`/create/actor`, data)
        .then(response => {
          console.log(response.data);
          const newUser = { ...CurrentUser, verified: true };
          localStorage.setItem("currentUser", JSON.stringify(newUser));
          http.post(`/update/user/${CurrentUser.id}`, { verified: true })
            .then(response2 => {
              navigate('/');
              window.location.reload();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });

        }

        function handleVerifyEmp(e) {
          e.preventDefault();

    const data = {
      user: CurrentUser,
      firstName,
      lastName: secondName,
    };

    http.post(`/create/director`, data)
      .then(response => {
        console.log(response.data);
        const newUser = { ...CurrentUser, verified: true };
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        http.post(`/update/user/${CurrentUser.id}`)
          .then(response2 => {
            navigate('/');
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
    
            }
        

    
    return (
      <div className="container">
        <header>
          <h3>
            Профиль <strong>{CurrentUser.username}</strong>
            <div>
            <strong>Ваш профиль не верифицирован!</strong>
            </div>
            <div>
            Для верификации заполните форму ниже
            </div>
          </h3>
        </header>
        
        {CurrentUser.role == "worker"? 
        <div><div className="col-md-5">
        <form onSubmit={handleVerify}>
          <div className="form-group mt-2">
            <input type="text" className="form-control" name="firstName" placeholder="Имя" value={firstName} onChange={onChangefirstName} required/>
          </div>
          <div className="form-group mt-2">
            <input type="text" className="form-control" name="secondName" placeholder="Фамилия" value={secondName} onChange={onChangesecondName} required/>
          </div>
          <div className="form-group mt-2">
            <input type="number" className="form-control" name="age" placeholder="Возраст" value={age} onChange={onChangeage} required/>
          </div>
          <div>Пол</div>
            <div className="form-group mt-2">
                <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        checked={gender === 'male'}
                        onChange={handleGenderChange}
                        />
                        <label htmlFor="male">Male</label>
                    <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={handleGenderChange}
                />
                <label htmlFor="female">Female</label>
            </div>
            <div className="form-group mt-2">
            <label>
                <input type="checkbox" name="isActor" value={isActor} onChange={handleCheck}/>
                Есть ли у вас актерское образование?
                </label>
            </div>

            <div className="form-group mt-2">
            <textarea className="form-control" name="experience" rows="5" cols="100" placeholder="Опыт работы" value={experience} onChange={onChangeexperience}/>
            </div>
            <div className="form-group mt-2">
            <textarea className="form-control" rows="10" cols="100" name="key_features" placeholder="О себе" value={key_features} onChange={onChangekey_features}/>
            </div>
            <div className="form-group mt-2">
            <input type="number" className="form-control" name="height" placeholder="Рост" value={height} onChange={onChangeheight}/>
            </div>
            <div className="form-group mt-2">
            <input type="number" className="form-control" name="weight" placeholder="Вес" value={weight} onChange={onChangeweight}/>
            </div>            

          <div className="form-group mt-2">
            <button className="btn btn-primary btn-block">Отправить</button>
          </div>
        </form>
      </div> </div>
        :<div>
            <div className="col-md-5">
        <form onSubmit={handleVerifyEmp}>
          <div className="form-group mt-2">
            <input type="text" className="form-control" name="firstName" placeholder="Имя" value={firstName} onChange={onChangefirstName} required/>
          </div>
          <div className="form-group mt-2">
            <input type="text" className="form-control" name="secondName" placeholder="Фамилия" value={secondName} onChange={onChangesecondName} required/>
          </div>
          <div className="form-group mt-2">
            <button className="btn btn-primary btn-block">Отправить</button>
          </div>
          </form>
            </div></div>}
      </div>

    );
  }

//   function mapStateToProps(state) {
//     const { user } = state.auth;
//     return {
//       user
//     };
// }

export default UnverifiedProfile;