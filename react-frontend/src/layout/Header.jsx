import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import http from '../http-common';
import Modal from 'react-bootstrap/Modal'; // Import Modal component
// import { Link } from 'react-router-dom';
function Header() {
  const [showOptions, setShowOptions] = useState(false);
  const [CurrentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [notification, setNotification] = useState({ message: '', variant: 'success' });
  const [showNotification, setShowNotification] = useState(false);
  const [Messages, setMessages] = useState([{}]);
  const [count_unread, setCount_Unread] = useState(0);
  useEffect(() => {
    const fetchUserData = async () => {
      const updatedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser(updatedCurrentUser);
  
      if (updatedCurrentUser && updatedCurrentUser.verified) {
        if (updatedCurrentUser.role === "worker") {
          try {
            const response = await http.get(`/actorUser/${updatedCurrentUser.id}`);
            // console.log(response);
            const actorData = response.data;
  
            const response2 = await http.get(`/actor_messages/${actorData.id}`);
            console.log(response2);
            const sorted_messages = await response2.data.sort(function(a,b){
              
              return new Date(b.date) - new Date(a.date);
            });
            setMessages(sorted_messages);
  
            const response3 = await http.get(`/actor_unreadmessages/${actorData.id}`);
            // console.log(response3);
            setCount_Unread(response3.data.length);
          } catch (error) {
            console.error('Error fetching actor data:', error);
          }
        }
      }
    };
  
    fetchUserData();
  }, []);
  
  const handleLogout = () => {
    // Ваш сценарий для выхода из системы
    console.log('User logged out');
    localStorage.removeItem("currentUser");
  };
  const showNotifier = (message, variant) => {
    setNotification({ message, variant });
    setShowNotification(true);

    // Automatically hide the notification after a delay (e.g., 5 seconds)
    setTimeout(() => {
      setShowNotification(false);
    }, 5000); // Adjust the delay as needed
  };
  const handleShowOptions = () => {
    setShowOptions(true);
    
  };

  
  const handleCloseOptions = () => {
    setShowOptions(false);
    Messages.forEach((message)=>{
      const data = {...message, unread:false};
      http.post(`/update/message/${message.id}`, data, { 'Content-Type': 'application/json' })
                  .then(response3 => {
                    console.log(response3.data);
                  })
                  .catch(e => {
                    console.log(e);
                  });
    })
    setCount_Unread(0);
  };
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const optionsContent =  (
    <Modal show={showOptions} onHide={handleCloseOptions}>
  <Modal.Header closeButton>
    <Modal.Title>Сообщения</Modal.Title>
  </Modal.Header>
  {Messages.length > 0 ? (
    <Modal.Body>
      <ul>
        {Messages.map((message, index) => (
          <li key={index}>
            <div>
            {message.director?.firstName} {message.director?.lastName}
            : {message.content}
            </div>
            <div>{new Date(message.date).toLocaleDateString('ru-RU', options)}</div>
            </li>
        ))}
      </ul>
    </Modal.Body>
  ) : (
    <Modal.Body>
      <div>Пусто</div>
    </Modal.Body>
  )}
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseOptions}>
      Закрыть
    </Button>
  </Modal.Footer>
</Modal>
  );

  return (
<Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Casting Platform</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">О проекте</Nav.Link>
            {CurrentUser?
            <div>

          
          {CurrentUser.verified && CurrentUser.role == "employer" ?
              <div>
              <Nav.Link href="/actors">База актёров</Nav.Link>
              <Nav.Link href="/createCasting">Создать объявление</Nav.Link>
              </div>
              :<div></div>
          }
            <Nav.Link href="/castings">Вакансии</Nav.Link>
            {/* <Nav.Link href="#">Profile</Nav.Link> */}
            </div>:<div></div>}
          </Nav>
          
          {CurrentUser && CurrentUser.role==='worker' && CurrentUser.verified?
          <Button variant="primary" onClick={handleShowOptions}>
          Уведомления ({count_unread} непрочитанных)
        </Button>
        :<div></div>}
        {optionsContent}
          <Nav>
            {CurrentUser==null?
            <Nav.Link href="/login" className="text-light">Войти</Nav.Link>
          :  <div>{CurrentUser.verified == true?<Nav.Link href="/profile" className="text-light">Profile {CurrentUser.username}</Nav.Link>
          : <Nav.Link href="/unverifiedprofile" className="text-light">Profile {CurrentUser.username}</Nav.Link>}
          <Nav.Link href="/" className="text-light" onClick={handleLogout}>LogOut</Nav.Link></div>
          
          }
            
            {/* <Link to={`/login`} className="nav-link">
                    Войти
            </Link> */}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;