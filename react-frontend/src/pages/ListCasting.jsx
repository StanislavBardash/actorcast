import React from 'react';
import { Table, Container } from 'react-bootstrap';
// импорт компонента Category
// import Casting from '../components/casting/Casting';

import http from "../http-common";
import {Link} from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
class ListCasting extends React.Component {
  // объект state описывает внутреннее состояние компонента (аналог data во Vue.js)
  state = {
    castings: [],
    sorted_castings:[],
    firstNameSearch: '',
    lastNameSearch: '',
    genreSearch: '',
    currentPage: 1,
  itemsPerPage: 5, // Change this value as per your requirement
  };

  // обработчик, который срабатывает до вызова render() (во Vue аналог — mounted())
  componentWillMount() {
    http
        .get("/castings")
        .then(response => {
            // обновление состояния
            const sorted_castings = response.data.sort(function(a,b){
              
              return new Date(b.deadline) - new Date(a.deadline);
            });
            this.setState({ castings: sorted_castings });
            this.setState({ sorted_castings: sorted_castings })
        })
        .catch(e => {
            console.log(e);
        });
  
  }
  handleDirectorSearch = (e) => {
    e.preventDefault();
    const { firstNameSearch, lastNameSearch } = this.state;
    const filteredCastings = this.state.castings.filter((casting) => {
      const director = casting.movie.director;
      return (
        director.firstName.toLowerCase().includes(firstNameSearch.toLowerCase()) &&
        director.lastName.toLowerCase().includes(lastNameSearch.toLowerCase())
      );
    });
    this.setState({ sorted_castings: filteredCastings });
    
  };
  sortCastingsAscending = () => {
    const sortedCastings = this.state.castings.slice().sort((a, b) => {
      return new Date(a.deadline) - new Date(b.deadline);
    });
    this.setState({ sorted_castings: sortedCastings });
  };
  sortCastingsDescending = () => {
    const sortedCastings = this.state.castings.slice().sort((a, b) => {
      return new Date(b.deadline) - new Date(a.deadline);
    });
    this.setState({ sorted_castings: sortedCastings });
  };
  handleGenreSearch = (e) => {
    e.preventDefault();
    const { genreSearch } = this.state;
    const filteredCastings = this.state.sorted_castings.filter((casting) => {
      return casting.movie.genre.toLowerCase().includes(genreSearch.toLowerCase());
    });
    this.setState({ sorted_castings: filteredCastings });
  };

  render() {
    // const { castings } = this.state;
    const { castings, currentPage, itemsPerPage, sorted_castings } = this.state;

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = sorted_castings.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(sorted_castings.length / itemsPerPage);

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

    // var list = [];
    // for (var i in castings) {
    //   list.push(<Casting key={i} id={castings[i].id} content={castings[i].description}/>)
    // }
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return <div>
      <div style={{
        alignContent:'center',
        display: 'flex',
        alignItems: 'row',
      }}>
  <form onSubmit={this.handleDirectorSearch}>
    <input
      type="text"
      placeholder="Director's First Name"
      value={this.state.firstNameSearch}
      onChange={(e) => this.setState({ firstNameSearch: e.target.value })}
    />
    <input
      type="text"
      placeholder="Director's Last Name"
      value={this.state.lastNameSearch}
      onChange={(e) => this.setState({ lastNameSearch: e.target.value })}
    />
    <button type="submit">Search Director</button>
  </form>


  <button onClick={this.sortCastingsAscending}>Sort by Deadline (Ascending)</button>
  <button onClick={this.sortCastingsDescending}>Sort by Deadline (Descending)</button>


  <form onSubmit={this.handleGenreSearch}>
    <input
      type="text"
      placeholder="Search by Genre"
      value={this.state.genreSearch}
      onChange={(e) => this.setState({ genreSearch: e.target.value })}
    />
    <button type="submit">Search Genre</button>
  </form>

</div>
        {sorted_castings.length ?
        
        <Container style={{ maxWidth: "80%" }}>

          
              <Table striped bordered hover responsive size="sm" className="text-center">
                <thead>
                  <tr>
                    <th>Описание</th>
                    <th>Автор</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((casting, index) => (
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
                        <div>Жанр: {casting.movie.genre}</div>
                        <div>{new Date(casting.deadline) > new Date()?<div style={{color: "green"}}>⊗</div>:<div style={{color: "red"}}>⊗</div>}Дедлайн: {new Date(casting.deadline).toLocaleDateString('ru-RU', options)}</div>
                        {casting.movie.director.user.organization?
                        <div>Явл. лицом организации {casting.movie.director.user.organization}</div>
                        :""
                  }
                      </td>
                    </tr>
                  ))}
                </tbody>
                <Pagination>{pageNumbers}</Pagination>
              </Table>
              </Container>
         : "Пусто"}    
    </div>
  }
}

export default ListCasting;