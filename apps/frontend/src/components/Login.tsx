//import React from 'react';
import { useState } from 'react';
import { Typography, Card, TextField, Button } from '@mui/material';

export default function Login(props) {

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
          localStorage.setItem('token', data.token);
          props.setIsLoggedIn(true);
      });
  }

  return <div>
        <div style={{display:'flex', justifyContent:'center', marginTop:75}}>     
            <Typography variant="h6">Sign In to Coursera</Typography>
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
            <Card variant="outlined" style={{width:400, padding:40, marginTop:20}}>
                <TextField variant="outlined" fullWidth={true} label='Email' onChange={function(e){setEmail(e.target.value)}}></TextField>
                <br/><br/>
                <TextField variant="outlined" fullWidth={true} label='Password' type='password' onChange={function(e){setPassword(e.target.value)}}></TextField>
                <br/><br/><br/><br/>
                <Button variant="contained" fullWidth={true} onClick={handleSignIn}>Sign In</Button>
            </Card>
        </div>
    </div>
}
