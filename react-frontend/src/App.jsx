import React from 'react';

// импорт компонента Category
// import Casting from './casting/Casting';
import ListCasting from './pages/ListCasting';
import Header from './layout/Header';
import Login from "./components/authorization/Login";
import Registration from "./components/authorization/Registration";
import Profile from "./components/authorization/Profile";
import UnverifiedProfile from "./components/authorization/UnverifiedProfile";
import ListActors from "./pages/ListActors";
import Actor from "./pages/Actor";
import Casting from "./pages/Casting";
import CastingRequest from "./pages/CastingRequest";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListRequest  from './pages/ListRequest';
import UserRequested from './pages/UserRequested';
import AcceptRequest from './pages/AcceptRequest';
import CreateCasting from './pages/CreateCasting';
import Home from './layout/Home';
import About from './pages/About';
import Edit from './pages/Edit';
// import Home from './layout/Home';
import 'bootstrap/dist/css/bootstrap.css';
import DirectorCasting from './pages/DirectorCasting';
import ListRequestUser from './pages/ListRequestUser';
import EditCasting from './pages/EditCasting';
class App extends React.Component {
  render() {
    return <div class='app'>
    
    <Header/>
    <BrowserRouter>
    <Routes>
            <Route path="/about" element={<About/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Registration/>} />
            {/* <Route path="/" element={<ListCasting/>} /> */}
            <Route path="/profile" element={<Profile/>} />
            <Route path="/unverifiedprofile" element={<UnverifiedProfile/>} />
            <Route path="/actors" element={<ListActors/>} />
            <Route path="/castings" element={<ListCasting/>} />
            <Route path="/actor/:id" element={<Actor/>} />
            <Route path="/casting/:id" element={<Casting/>} />
            {/* <Route path="/usercastings" element={<Actor/>} /> */}
            <Route path="/castingrequest/:id" element={<CastingRequest/>} />
            <Route path="/requests" element={<ListRequest/>} />
            <Route path="/requested/:id" element={<UserRequested/>} />
            <Route path="/accept_user/:id" element={<AcceptRequest/>} />
            <Route path="/createCasting" element={<CreateCasting/>} />
            <Route path="/edit_profile" element={<Edit/>} />
            <Route path="/directorUser" element={<DirectorCasting/>} />
            <Route path="/requests_for_user" element={<ListRequestUser/>} />
            <Route path="/edit_casting/:id" element={<EditCasting/>} />
        </Routes>
    </BrowserRouter>
    {/* <Home/>, */}
    {/* <ListCasting/> */}
    </div>
  }
}

export default App;