import React from 'react';
import { Table, Container } from 'react-bootstrap';
import {Link} from "react-router-dom";
// импорт компонента Category
// import Casting from '../components/casting/Casting';

import http from "../http-common";
import Pagination from 'react-bootstrap/Pagination';
class ListActors extends React.Component {
  // объект state описывает внутреннее состояние компонента (аналог data во Vue.js)
  state = {
    actors: [],
    currentPage: 1,
  itemsPerPage: 5, 
  sorted_actors:[],
    firstNameSearch: '',
    lastNameSearch: '',
  };

  // обработчик, который срабатывает до вызова render() (во Vue аналог — mounted())
  componentWillMount() {
    http
        .get("/actors")
        .then(response => {
          var ans = response.data;
          ans.forEach((element, i) => {
            http
              .get(`/actorreviews/${element.id}`)
              .then(response2 => {
                var c = 0;
                var sm = 0;


                response2.data.forEach(element2 => {
                    sm+=element2.rating
                    c+=1
                  
                });
                
                ans[i] = {...ans[i], rating:Math.floor(sm/c)};
                this.setState({ actors: ans });
                this.setState({ sorted_actors: ans });
              })
              .catch(e => {
                  console.log(e);
              });
            
          });
            // обновление состояния
            this.setState({ actors: ans })
            
        })
        .catch(e => {
            console.log(e);
        });
  
  }
  handleDirectorSearch = (e) => {
    e.preventDefault();
    const { firstNameSearch, lastNameSearch } = this.state;
    const filteredActors = this.state.actors.filter((actor) => {
      
      return (
        actor.firstName.toLowerCase().includes(firstNameSearch.toLowerCase()) &&
        actor.secondName.toLowerCase().includes(lastNameSearch.toLowerCase())
      );
    });
    this.setState({ sorted_actors: filteredActors });
    
  };
  sortCastingsAscending = () => {
    const sortedActors = this.state.actors.slice().sort((a, b) => {
      return a.rating - b.rating;
    });
    this.setState({ sorted_actors: sortedActors });
  };
  sortCastingsDescending = () => {
    const sortedActors = this.state.actors.slice().sort((a, b) => {
      return b.rating - a.rating;
    });
    this.setState({ sorted_actors: sortedActors });
  };
  sortByAgesAscending = () => {
    const sortedActors = this.state.actors.slice().sort((a, b) => {
      return a.age - b.age;
    });
    this.setState({ sorted_actors: sortedActors });
  };
  sortByAgeDescending = () => {
    const sortedActors = this.state.actors.slice().sort((a, b) => {
      return b.age - a.age;
    });
    this.setState({ sorted_actors: sortedActors });
  };

  render() {
    const { actors, currentPage, itemsPerPage , sorted_actors} = this.state;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sorted_actors.slice(indexOfFirstItem, indexOfLastItem);
    const filled_star = "★";
    const empty_star = "☆";
  const totalPages = Math.ceil(sorted_actors.length / itemsPerPage);
    // const { actors } = this.state;
    console.log(actors);
    // var list = [];
    // for (var i in castings) {
    //   list.push(<Casting key={i} id={castings[i].id} content={castings[i].description}/>)
    // }
    const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => this.setState({ currentPage: i })}
      >
        {i}
      </Pagination.Item>
    );
  }
    return <div>
      <div style={{
        alignContent:'center',
        display: 'flex',
        alignItems: 'row',
      }}>
  <form onSubmit={this.handleDirectorSearch}>
    <input
      type="text"
      placeholder="Actor's First Name"
      value={this.state.firstNameSearch}
      onChange={(e) => this.setState({ firstNameSearch: e.target.value })}
    />
    <input
      type="text"
      placeholder="Actor's Last Name"
      value={this.state.lastNameSearch}
      onChange={(e) => this.setState({ lastNameSearch: e.target.value })}
    />
    <button type="submit">Search Actor</button>
  </form>


  <button onClick={this.sortCastingsAscending}>Sort by Rating (Ascending)</button>
  <button onClick={this.sortCastingsDescending}>Sort by Rating (Descending)</button>
  <button onClick={this.sortByAgesAscending}>Sort by Age (Ascending)</button>
  <button onClick={this.sortByAgeDescending}>Sort by Age (Descending)</button>




</div>
        {sorted_actors.length ?
        <Container style={{ maxWidth: "25%" }}>
              <Table striped bordered hover responsive size="sm" className="text-center">
                <thead>
                  <tr>
                    <th>Актёр</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((actor, index) => (
                    <tr key={index}>
                      {/* Добавить в бд тайтл объявления. Типа кто требуется. Кратко */}
                      
                      <td>
                      <Link to={`/actor/${actor.id}`}>
                        <div style={{ textAlign: "left" }}>
                          <strong>{actor.firstName} {actor.secondName}</strong>
                          </div>
                    </Link>
                        {actor.keyFeatures?
                          <div style={{ textAlign: "left" }}>
                            {actor.keyFeatures.length < 45?
                             actor.keyFeatures:
                            actor.keyFeatures.substring(0, 45)+"..."
                            }
                          </div>
                      :<div style={{ textAlign: "left" }}>Не указано</div>
                      }
                      <div style={{ textAlign: "left" }}>
                      Email:{actor.user.email}
                      </div>
                      <div style={{ textAlign: "left" }}>
                      Возраст:{actor.age}
                      </div>
                      {actor.rating?
                      <div style={{ textAlign: "left" }}>
                      Рейтинг:{actor.rating}{filled_star.repeat(actor.rating)}{empty_star.repeat(5-actor.rating)}
                      </div>
  :<div style={{ textAlign: "left" }}>Рейтинг отсутствует</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <Pagination>{pageNumbers}</Pagination>
              </Table>
              </Container>
         : "Loading..."}    
    </div>
  }
}

export default ListActors;