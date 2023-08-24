import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../store/atoms/user';
import { Grid, Button, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import React from 'react';
import './Landing.css';

export default function Landing() {

  const navigate = useNavigate();

  const isLoggedIn = useRecoilValue(isLoggedInState);
  
  return ( isLoggedIn ? <div style={{}}><Slides></Slides></div>
    : <div>
        <Grid container style={{marginTop:70, marginBottom:0, marginLeft:0, marginRight:0}}>

          <Grid item container xs={12} md={4} sx={{order:{xs: 2, md: 1}, height:{xs:'40vh', md:'50vh'}, backgroundColor:'', display:'flex', flexDirection:'column'}} justifyContent='space-evenly' alignItems='center'>
            
                <div style={{marginTop:0}}>  
                  <Typography variant='h5' style={{fontWeight: 'normal', alignSelf:'center'}}>A place to learn and grow</Typography>
                </div>
                <div style={{marginTop:0, width:'90%', alignSelf:'end'}}>  
                  <Typography variant='subtitle2' style={{fontWeight: 'normal'}}>Discover the possibilities that await you with our comprehensive courses. Whether you're a curious beginner or a seasoned professional, we're here to fuel your journey towards success.</Typography>
                </div>
                <div style={{display:'flex', width:'80%', justifyContent:'space-evenly', alignItems:'flex-start', marginBottom:0}}>
                  <Button variant='contained' size='small' sx={{ height: '100%', backgroundColor: '#645cff', textTransform:'none', fontSize:15}} onClick={function(){navigate('/login')}}>Login</Button>
                  <Button variant='contained' size='small' sx={{ height: '100%', backgroundColor: '#645cff', textTransform:'none', fontSize:15}} onClick={function(){navigate('/register')}}>Signup</Button>
                </div>
          
          </Grid>

          <Grid item container xs={12} md={8} sx={{order:{xs: 1, md: 2},  backgroundColor:''}} justifyContent='center'>
            <LoggedOutSlides></LoggedOutSlides>
          </Grid>
        </Grid>
    </div>
  )
}

function Slides(){

  const imageStyle = {
    height: '20vw',
    width: '90vw',
  } as React.CSSProperties;

  const carouselStyle = {
    marginTop:'4vh',
    borderRadius:'10px',
    overflow:'hidden'
  } as React.CSSProperties;

  return <div style={carouselStyle}>
    <Carousel className='carousel-container' showThumbs={false} swipeable={true} showArrows={true} autoPlay={true} emulateTouch={true} showStatus={false} >
      <div className='carousel-item'>
          <img src="/1.jpg" style={imageStyle}/>
      </div>
      <div className='carousel-item'>
          <img src="/2.jpg" style={imageStyle}/>
      </div>
      <div className='carousel-item'>
          <img src="/3.jpg" style={imageStyle}/>
      </div>
      <div className='carousel-item'>
          <img src="/4.jpg" style={imageStyle}/>
      </div>
    </Carousel>
  </div>
}

function LoggedOutSlides(){

  const carouselStyle = {
    height: '',
    width: '90%',
    marginTop: '0%',
    overflow:'hidden'
  } as React.CSSProperties;

  const imageStyle = {
    height: '100%',
    width: '100%',
  } as React.CSSProperties;

  return <div style={carouselStyle}>
    <Carousel className='carousel-container' showThumbs={false} swipeable={true} showArrows={true} autoPlay={true} emulateTouch={true} showStatus={false} swipeScrollTolerance={50} useKeyboardArrows={true} infiniteLoop={true}>
      <div className='carousel-item'>
          <img src="/1.jpg" style={imageStyle}/>
      </div>
      <div className='carousel-item'>
          <img src="/2.jpg" style={imageStyle}/>
      </div>
      <div className='carousel-item'>
          <img src="/3.jpg" style={imageStyle}/>
      </div>
      <div className='carousel-item'>
          <img src="/4.jpg" style={imageStyle}/>
      </div>
    </Carousel>
  </div>
}