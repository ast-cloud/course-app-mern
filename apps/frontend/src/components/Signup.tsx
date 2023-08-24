import { useEffect, useState } from 'react';
import { Typography, Card, TextField, Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../store/atoms/user';
import {useNavigate} from 'react-router-dom';
//import Cookies from 'js-cookie';

export default function Signup(){

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    function handleSignUp(){
        fetch('http://localhost:3000/users/signup', {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                username: email,
                password: password
            })
        }).then(function(res){
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
            <Typography variant="h6">Welcome to Coursera! Register</Typography>
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
            <Card variant="outlined" style={{width:400, padding:40, marginTop:20}}>
                <TextField variant="outlined" fullWidth={true} label='Email' onChange={function(e){setEmail(e.target.value)}}></TextField>
                <br/><br/>
                <TextField variant="outlined" fullWidth={true} label='Password' type="password" onChange={function(e){setPassword(e.target.value)}}></TextField>
                <br/><br/><br/><br/>
                <Button variant="contained" fullWidth={true} sx={{backgroundColor:'#645cff'}} onClick={handleSignUp}>Sign Up</Button>
            </Card>
        </div>
    </div>
}