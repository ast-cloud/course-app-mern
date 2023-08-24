import  { useEffect, useState } from 'react';
import { Typography, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Courses(){

    const navigate = useNavigate();

    const [courses, setCourses] = useState(undefined);

    useEffect(function(){
        axios.get('http://localhost:3000/admin/courses', {
            headers: {
              'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(function(res){
            console.log('res.status after calling api - '+res.status);
            if(res.status==200){
                setCourses(res.data.courses);
            }
        }).catch(function(res){
            if(res.response.status==401){
              setCourses(null);
              navigate('/login');
            }
        });
    },[]);

    if(courses===undefined){
        return(
          <div style={{display:'flex', justifyContent:'center', marginTop:120}}>
            <CircularProgress/>
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
              <div style={{display:'flex', justifyContent:'center', marginTop:45}}>
                <Typography variant='h5'>Courses</Typography>
              </div>
              <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', marginLeft:80, marginRight:80 }}>
                  {courses.map(c => <div key={c._id}> <Course id={c._id} title={c.title} image={c.imageLink} description={c.description} price={c.price} /> </div>)}
              </div>
          </div>
        )
    }
}

function Course(props) {

    const navigate = useNavigate();
  
    return (
        <Card onClick={function(){navigate('/course/'+props.id)}} style={{marginTop:40, marginRight:20, cursor:'pointer'}}>
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
    )
}
  