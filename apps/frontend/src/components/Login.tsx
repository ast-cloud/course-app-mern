//import React from 'react';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Typography, Card, TextField, Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../store/atoms/user';
//import Cookies from 'js-cookie';

export default function Login() {

    const navigate = useNavigate();
    
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
        
    function handleSignIn(){
        
        fetch('http://localhost:3000/users/login', {
            method:'POST',
            headers:{
                username: email,
                password: password
            }
        }).then(function(res){
            console.log(res);
            return res.json();
        }).then(function(data){
            console.log(data);
            //Cookies.set('token', data.token, {expires: 7});
            localStorage.setItem('token', data.token);
            setIsLoggedIn(true);
        });
    }

    useEffect(function(){
        if(isLoggedIn){
            navigate('/');
        }
    },[isLoggedIn]);
    
    return <div>
            <div style={{display:'flex', justifyContent:'center', marginTop:75}}>     
                <Typography variant="h6">Sign In to Coursera</Typography>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Card variant="outlined" style={{width:400, padding:40, marginTop:20}}>
                    <TextField variant="outlined" fullWidth={true} label='Email' onChange={function(e){setEmail(e.target.value)}}></TextField>
                    <br/><br/>
                    <TextField variant="outlined" fullWidth={true} label='Password' type='password' onChange={function(e){setPassword(e.target.value)}} onKeyUp={function(e){if(e.key=='Enter'){handleSignIn();}}}></TextField>
                    <br/><br/><br/><br/>
                    <Button variant="contained" fullWidth={true} sx={{backgroundColor:'#645cff'}} onClick={handleSignIn}>Sign In</Button>
                </Card>
            </div>
        </div>
}
