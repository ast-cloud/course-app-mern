import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Courses from './components/Courses';
import AppBar from './AppBar';
import axios from 'axios';
import PurchasedCourses from './components/PurchasedCourses';
import Course from './components/Course';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(function(){
    axios.get('http://localhost:3000/users/me', {
      headers:{
        'Authorization':'Bearer '+localStorage.getItem('token')
      }
    }).then(function(res){
      if(res.status==200){
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
      }
    });
  },[]);

  return (
    <Router>
      <AppBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></AppBar>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/register' element={<Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/courses' element={<Courses/>} />
        <Route path='/purchased' element={<PurchasedCourses/>} />
        <Route path='/courses/:id' element={<Course/>} />
      </Routes>
    </Router>
  )
}

export default App
