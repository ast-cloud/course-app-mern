import { useState } from 'react';
import {Button, Typography, Card, Grid, IconButton, Menu, MenuItem} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoggedInState } from './store/atoms/user';
import { selectedCourseTab } from './store/atoms/coursePage';
import MenuIcon from '@mui/icons-material/Menu';

function AppBar(){

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const setSelectedTab = useSetRecoilState(selectedCourseTab);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();


    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setMobileMenuOpen(true);
      };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMobileMenuOpen(false);
      };

    // return <div style={{display:'flex', justifyContent:'space-between', marginTop:15}}>
    //   
    //     <Button>Home</Button>
    //     <Button>Courses</Button>
    //     { isLoggedIn ? <div style={{display:'flex'}}>
    //         <div>
    //             <Button variant="outlined" style={{fontWeight:'bold'}} size="small" onClick={function(){localStorage.removeItem('token'); setIsLoggedIn(false);}}>Logout</Button>
    //         </div>
    //     </div> 
    //     : <div style={{display:'flex'}}>
    //         <div style={{marginRight:10}}>
    //             <Button variant="contained" size="small" onClick={function(){navigate('/login')}}>SignIn</Button>
    //         </div>
    //         <div style={{marginRight:10}}>
    //             <Button variant="contained" size="small" onClick={function(){navigate('/register')}}>SignUp</Button>
    //         </div>
    //     </div>}
    // </div>

    return (
        <Grid container>

            <Grid item xs={6} sm={4}>
                <Card variant='outlined' onClick={function(){navigate('/')}} style={{border:'none', boxShadow:'none', cursor:'pointer'}}><Typography variant="h4" color='#645cff'>Coursera</Typography></Card>
            </Grid>

            <Grid item container sm={4} justifyContent='center' sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Button sx={{textTransform:'none', fontSize:20, fontWeight:'bold', color:'black'}} onClick={function(){navigate('/')}}>Home</Button>
                <Button sx={{textTransform:'none', fontSize:20, fontWeight:'bold', color:'black'}} onClick={function(){navigate('/courses')}}>Courses</Button>
                <Button sx={{textTransform:'none', fontSize:20, fontWeight:'bold', color:'black'}} onClick={function(){}}>About Us</Button>
                <Button sx={{textTransform:'none', fontSize:20, fontWeight:'bold', color:'black'}} onClick={function(){}}>Contact</Button>
            </Grid>

            <Grid item container xs={6} sm={4} justifyContent='flex-end' sx={{maxHeight:'1vh'}}>

                { isLoggedIn ? 
                <Button variant="outlined" sx={{display: {xs: 'none', sm: 'flex'}, fontWeight:'bold'}} size="small" onClick={function(){localStorage.removeItem('token'); setIsLoggedIn(false); setSelectedTab(0);}}>Logout</Button>
                :<div style={{display:'flex'}}>
                    <Button variant="contained" size="small" sx={{display: {xs: 'none', sm: 'block'},  backgroundColor: '#645cff', marginRight:2, textTransform:'none'}} onClick={function(){navigate('/login')}}>Login</Button>
                    <Button variant="contained" size="small" sx={{display: {xs: 'none', sm: 'block'},  backgroundColor: '#645cff', textTransform:'none'}} onClick={function(){navigate('/register')}}>SignUp</Button>
                </div>}

                <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen} sx={{display: {xs: 'block', sm: 'none'} }}>
                    <MenuIcon />
                </IconButton>
                
                <Menu anchorEl={anchorEl} open={mobileMenuOpen} onClose={handleMenuClose} sx={{display: {xs: 'block', sm: 'none'} }} >
                    <MenuItem onClick={handleMenuClose}>Home</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Courses</MenuItem>
                    <MenuItem onClick={handleMenuClose}>About Us</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
                    {isLoggedIn?<MenuItem onClick={() => {
                            localStorage.removeItem('token');
                            setIsLoggedIn(false);
                            setSelectedTab(0);
                            handleMenuClose();
                        }}>
                        Logout
                    </MenuItem>:<div></div>}
                </Menu>
            </Grid>
        </Grid>)
}

export default AppBar;