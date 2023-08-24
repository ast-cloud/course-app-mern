import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import AppBar from './AppBar';
import Landing from './components/Landing';
import Login from './components/Login';
import Courses from './components/Courses';
import Course from './components/Course';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from './store/atoms/user';

function App() {

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  useEffect(function(){
    axios.get('http://localhost:3000/admin/me', {
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
    }).catch(function(){
      setIsLoggedIn(false);
    });
  },[]);

  return (
    <Router>
      <AppBar></AppBar>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/courses' element={<Courses/>} />
        <Route path='/course/:id' element={<Course/>} />
        <Route path='/users' element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App
