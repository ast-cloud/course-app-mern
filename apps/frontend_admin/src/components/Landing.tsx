import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../store/atoms/user';
import { Button } from '@mui/material';

export default function Landing() {

  const isLoggedIn = useRecoilValue(isLoggedInState);  
  const navigate = useNavigate();
  console.log('In Landing component, isLoggedIn - '+isLoggedIn);

  useEffect(function(){
    console.log('In Landing component, in useEffect, isLoggedIn - '+isLoggedIn);
    if(isLoggedIn==false){
      navigate('/login')
    }
  }, [isLoggedIn]);

  

  return (
    <div style={{display:'flex', justifyContent:'space-around', marginTop:120}}>
      <Button variant='contained' style={{backgroundColor:'teal'}} onClick={function(){navigate('/courses')}}>Manage courses</Button>
      <Button variant='contained' style={{backgroundColor:'darkred'}}>Manage users</Button>
    </div>
  );

}
