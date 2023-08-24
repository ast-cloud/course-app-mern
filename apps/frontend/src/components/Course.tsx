import { useEffect, useState } from 'react';
import {Typography, Card, CardMedia, CardContent, Button} from '@mui/material';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../store/atoms/user';
import { useNavigate } from 'react-router-dom';



export default function Course() {

    const {id} = useParams();
  
    const [course, setCourse] = useState(null);
    const [isPurchased, setIsPurchased] = useState(null);

    const isLoggedIn = useRecoilValue(isLoggedInState);

    const navigate = useNavigate();

    
    

    useEffect(function(){
        const fetchData = async ()=>{
            const courseDetails = await axios.get('http://localhost:3000/users/course/'+id, {
                headers: {
                    'Authorization':'Bearer '+localStorage.getItem('token')
                }
            });
            setCourse(courseDetails.data.course);

            if(isLoggedIn){
                const pCourses = await axios.get('http://localhost:3000/users/purchasedCourses', {
                    headers: {
                        'Authorization':'Bearer '+localStorage.getItem('token')
                    }
                });
                if(pCourses.data.purchasedCoursesIds.includes(id)){
                    setIsPurchased(true);
                }
                else{
                    setIsPurchased(false);
                }

            }
            
        }
        fetchData();
    },[]);

    function handleBuy(){
        if(isLoggedIn){
            axios.get('http://localhost:3000/users/courses/'+course._id, {
                headers:{
                    'Authorization':'Bearer '+localStorage.getItem('token')
                }
            }).then(function(res){
                if(res.status==200){
                    setIsPurchased(true);
                }
            });
        }
        else{
            navigate('/login');
        }
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
                        {!isLoggedIn && <Button variant='outlined' size='small' onClick={handleBuy}>Buy Course</Button>}
                        {isLoggedIn &&  isPurchased==true && <Typography>Purchased</Typography>}
                        {isLoggedIn &&  isPurchased==false && <Button variant='outlined' size='small' onClick={handleBuy}>Buy Course</Button>}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>

}
