import React from 'react';
import { Table, Container } from 'react-bootstrap';
import {Link} from "react-router-dom";
// импорт компонента Category
// import Casting from '../components/casting/Casting';

import http from "../http-common";

class ListRequestUser extends React.Component {
  // объект state описывает внутреннее состояние компонента (аналог data во Vue.js)
  state = {
    requests: [],
    CurrentUser: JSON.parse(localStorage.getItem('currentUser')),
    directors : []
    
  };
  

  // обработчик, который срабатывает до вызова render() (во Vue аналог — mounted())
  componentWillMount() {
    http
        .get(`/casting_requests_by_user/${this.state.CurrentUser.id}`)
        .then(response => {
            // обновление состояния
            this.setState({ requests: response.data })

                
        })
        .catch(e => {
            console.log(e);
        });
    

        
  }

  render() {
    
    const { requests } = this.state;

    return <div>

        <Container style={{ maxWidth: "25%" }}>
              <Table striped bordered hover responsive size="sm" className="text-center">
                <thead>
                  <tr>
                    <th>Режиссёр</th>
                    <th>Объявление</th>
                    <th>Текст заявки</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request, index) => (
                    <tr key={index}>
                      {/* Добавить в бд тайтл объявления. Типа кто требуется. Кратко */}
                      <td>{request.casting.movie.director.firstName} {request.casting.movie.director.lastName}</td>
                      <td>Объявление: <Link to={`/casting/${request.casting.id}`}>{request.casting.title}</Link></td>
                      <td>
                      <Link to={`/requested/${request.id}`}>
                        <div style={{ textAlign: "left" }}>
                            {request.user.username}: {request.content}
                          </div>
                    </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              </Container>
   
    </div>
  }
}

export default ListRequestUser;