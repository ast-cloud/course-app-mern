import {Button, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

function AppBar(props){

    const navigate = useNavigate();

    return <div style={{display:'flex', justifyContent:'space-between', marginTop:15}}>
        <Typography variant="h4">Coursera</Typography>
        { props.isLoggedIn ? <div style={{display:'flex'}}>
            <div>
                <Button variant="outlined" style={{fontWeight:'bold'}} size="small" onClick={function(){localStorage.removeItem('token'); props.setIsLoggedIn(false);}}>Logout</Button>
            </div>
        </div> 
        : <div style={{display:'flex'}}>
            <div style={{marginRight:10}}>
                <Button variant="contained" size="small" onClick={function(){navigate('/login')}}>SignIn</Button>
            </div>
            <div style={{marginRight:10}}>
                <Button variant="contained" size="small" onClick={function(){navigate('/register')}}>SignUp</Button>
            </div>
        </div>}
    </div>
}

export default AppBar;