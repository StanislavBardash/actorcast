import React from 'react';
import { Table, Container, Button } from 'react-bootstrap';
// импорт компонента Category
// import Casting from '../components/casting/Casting';

import http from "../http-common";
import {Link} from "react-router-dom";

class DirectorCasting extends React.Component {
  // объект state описывает внутреннее состояние компонента (аналог data во Vue.js)
  
  state = {
    castings: [],
    director: {},
    CurrentUser:JSON.parse(localStorage.getItem('currentUser')),
  };

  // обработчик, который срабатывает до вызова render() (во Vue аналог — mounted())
  async componentWillMount() {
    try {
      const directorResponse = await http.get(`/directorUser/${this.state.CurrentUser.id}`);
      this.setState({ director: directorResponse.data });
      const castingsResponse = await http.get(`/list_directorcasting/${directorResponse.data.id}`);
      this.setState({ castings: castingsResponse.data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    const { castings } = this.state;

    // var list = [];
    // for (var i in castings) {
    //   list.push(<Casting key={i} id={castings[i].id} content={castings[i].description}/>)
    // }
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return <div>
        {castings.length ?
        <Container style={{ maxWidth: "80%" }}>
              <Table striped bordered hover responsive size="sm" className="text-center">
                <thead>
                  <tr>
                    <th>Описание</th>
                    <th>Автор</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {castings.map((casting, index) => (
                    <tr key={index}>
                      {/* Добавить в бд тайтл объявления. Типа кто требуется. Кратко */}
                      
                      <td>
                      <Link to={`/casting/${casting.id}`}>
                        <div style={{ textAlign: "left" }}>
                          <strong>{casting.title}</strong>
                          </div>
                          </Link>
                          <div style={{ textAlign: "left" }}>
                      {casting.description.substring(0, 100)}...
                      </div>
                      </td>


                      <td style={{ textAlign: "left" }}>
                        <div>Автор: {casting.movie.director.firstName} {casting.movie.director.lastName}</div>
                        <div>Город: {casting.city}</div>
                        <div>Фильм: {casting.movie.title}</div>
                        <div>Дедлайн: {new Date(casting.deadline).toLocaleDateString('ru-RU', options)}</div>
                        {casting.movie.director.user.organization?
                        <div>{casting.movie.director.user.organization}</div>
                        :""
                  }
                      </td>
                      <td><Button href={`/edit_casting/${casting.id}`}>Редактировать</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              </Container>
         : "Пусто"}    
    </div>
  }
}

export default DirectorCasting;