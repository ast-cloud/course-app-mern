import { useEffect, useState } from 'react';
import {Typography, Card, CardMedia, CardContent, Button} from '@mui/material'
import {useParams} from 'react-router-dom';
import axios from 'axios';


export default function Course() {

    const {id} = useParams();
  
    const [course, setCourse] = useState(null);

    useEffect(function(){
        axios.get('http://localhost:3000/users/course/'+id, {
            headers: {
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(function(res){
            setCourse(res.data.course);
        });
    },[]);

    function handleBuy(){
        axios.get('http://localhost:3000/users/courses/'+course._id, {
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        });
    }

    return course==null ? <div>Loading....</div>
    :<div>
        <div style={{display:'flex', justifyContent:'center', marginTop:75}}>
            <Typography variant='h4'>
                {course.title}
            </Typography>
        </div>
         
        <div style={{display:'flex', justifyContent:'center', marginTop:25}}>
            <Card style={{width:500, paddingLeft:20, paddingRight:20, paddingBottom:0}}>
                <div style={{display:'flex', justifyContent:'center', marginTop:35}}>
                    <CardMedia sx={{ height: 140, width:265}} image={course.imageLink} title={course.title} />
                </div>
                <CardContent>
                    <br />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Typography variant='h6'>{course.description}</Typography>
                    </div>
                    <br />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Typography variant='h6'>{course.price}</Typography>
                    </div>
                    <br />
                    <div style={{display:'flex', justifyContent:'end'}}>
                        <Button variant='outlined' size='small' onClick={handleBuy}>Buy Course</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>

}
