import { useState } from 'react';
import { Typography, Card, TextField, Button } from '@mui/material';

export default function Signup(props){

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
            localStorage.setItem('token', data.token);
            props.setIsLoggedIn(true);
        });
    }
    
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
                <Button variant="contained" fullWidth={true} onClick={handleSignUp}>Sign Up</Button>
            </Card>
        </div>
    </div>
}