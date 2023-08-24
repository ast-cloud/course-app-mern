import  { useEffect, useState } from 'react';
import { Typography, Card, CardMedia, CardContent, Tab, Tabs, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState } from '../store/atoms/user';
import { selectedCourseTab } from '../store/atoms/coursePage';

export default function Courses() {

  const [courses, setCourses] = useState(undefined);
  const [purchasedCourses, setPurchasedCourses] = useState(undefined);

  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [selectedTab, setSelectedTab] = useRecoilState(selectedCourseTab);


  useEffect(function(){
    const fetchData = async function (){

      var allCourses = await axios.get('http://localhost:3000/users/courses', {
        headers: {
          'Authorization':'Bearer '+localStorage.getItem('token')
        }
      });

      if(allCourses.status==200){
        setCourses(allCourses.data.courses);
      }
      else{
        setCourses(null);
      }

      var pCoursesDetails = await axios.get('http://localhost:3000/users/purchasedCoursesDetails',{
        headers: {
          'Authorization':'Bearer '+localStorage.getItem('token')
        }
      });

      if(pCoursesDetails.status==200){
        setPurchasedCourses(pCoursesDetails.data.purchasedCoursesDetails);
      }
      else{
        setPurchasedCourses(null);
      }
    }
    fetchData();
    // axios.get('http://localhost:3000/users/courses', {
    //   headers: {
    //     'Authorization':'Bearer '+localStorage.getItem('token')
    //   }
    // }).then(function(res){
    //   console.log('res.status after calling api - '+res.status);
    //   setCourses(res.data.courses);
    // }).catch(function(res){
    //   if(res.response.status==403){
    //     setCourses(null);
    //   }
    // });
  },[]);

  useEffect(function(){
    console.log('courses variable changed - '+JSON.stringify(courses));
  },[courses]);


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };



  if(courses===undefined){
    return(
      <div>
        Loading data....
      </div>
    )
  }
  else if(courses===null){
    return(
      <div>
        Cannot load data.
      </div>
    )
  }
  else{
    return (
      <div>
        <div>
          <Tabs value={selectedTab} onChange={handleTabChange} centered sx={{display:'flex', justifyContent:'space-between'}}>
            <Tab label="Courses" />
            {isLoggedIn && <Tab label="Purchased Courses" />}
          </Tabs>
          {/* <Typography>
            {selectedTab === 0 && <div>Content for Tab 1</div>}
            {selectedTab === 1 && <div>Content for Tab 2</div>}
          </Typography> */}
        </div>
          {/* <div style={{display:'flex', justifyContent:'space-evenly', marginTop:45}}>
            <Typography variant='h5'>Courses</Typography>
          </div> */}
          {selectedTab === 0 && <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', marginLeft:80, marginRight:80 }}> {courses.map(c => <div key={c._id}> <Course id={c._id} title={c.title} image={c.imageLink} description={c.description} price={c.price} /> </div>)} </div>}

          {selectedTab === 1 && purchasedCourses && <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', marginLeft:80, marginRight:80 }}> {purchasedCourses.map(c => <div key={c._id}> <Course id={c._id} title={c.title} image={c.imageLink} description={c.description} price={c.price} /> </div>)} </div>}

          {selectedTab === 1 && !purchasedCourses && <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'20%'}}> <CircularProgress/> </div> }
      </div>
    )
  }

  
}

function Course(props) {

  const navigate = useNavigate();

  return <Card onClick={function(){navigate('/courses/'+props.id)}} style={{marginTop:40, marginRight:20, cursor:'pointer'}}>
        <CardMedia sx={{ height: 140, width:265 }} image={props.image} title={props.title} />
        <CardContent>
            <Typography variant="h6">
                {props.title}
            </Typography>
            <Typography variant="body2">
                {props.description}
            </Typography>
            <br />
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <Typography variant="body2">
                    {props.price}
                </Typography>
            </div>
        </CardContent>
    </Card>
}
