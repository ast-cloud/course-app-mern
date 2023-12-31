import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AppBarCustom from './AppBar';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Courses from './components/Courses';
import axios from 'axios';
import PurchasedCourses from './components/PurchasedCourses';
import Course from './components/Course';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from './store/atoms/user';

function App() {

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

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
    }).catch(function(){
      setIsLoggedIn(false);
    });
  },[]);

  return (
    <Router>
      <AppBarCustom></AppBarCustom>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/courses' element={<Courses/>} />
        <Route path='/purchased' element={<PurchasedCourses/>} />
        <Route path='/courses/:id' element={<Course/>} />
      </Routes>
    </Router>
  )
}

export default App
