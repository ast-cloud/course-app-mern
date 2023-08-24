import {Button, Typography, Card} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from './store/atoms/user';

function AppBar(){

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

    const navigate = useNavigate();

    return <div style={{display:'flex', justifyContent:'space-between', marginTop:15}}>
        <Card onClick={function(){navigate('/')}} style={{border:'none', boxShadow:'none', cursor:'pointer'}}><Typography variant="h4">Coursera</Typography></Card>
        { isLoggedIn ? <div style={{display:'flex'}}>
            <div>
                <Button variant="outlined" style={{fontWeight:'bold'}} size="small" onClick={function(){localStorage.removeItem('token'); setIsLoggedIn(false);}}>Logout</Button>
            </div>
        </div> 
        : <div style={{display:'flex'}}>
            
        </div>}
    </div>
}

export default AppBar;