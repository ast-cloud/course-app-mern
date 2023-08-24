import { useEffect, useState } from 'react';
import {Typography, Card, CardMedia, CardContent, Button, TextField, CircularProgress, Snackbar, Alert} from '@mui/material'
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { snackInfo } from '../store/atoms/snackbar';




export default function Course() {

    const {id} = useParams();

    const navigate = useNavigate();

    const [snackbarInfo, setSnackbarInfo] = useRecoilState(snackInfo);
  
    const [course, setCourse] = useState(null);
    const [edit, setEdit] = useState(false);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(function(){
        axios.get('http://localhost:3000/admin/course/'+id, {
            headers: {
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(function(res){
            setCourse(res.data.course);
        }).catch(function(res){
            console.log('Inside catch, Course component')
            if(res.response.status==401){
                navigate('/login');
            }
        });
    },[edit]);

    function editCourse(){
        setTitle(course.title);
        setDescription(course.description);
        setPrice(course.price);
        setEdit(true);
    }

    function saveEditedCourse(){
        axios.put('http://localhost:3000/admin/courses/'+course._id, {
            title: title,
            description: description,
            price: price
        }, { 
            headers: {
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(function(res){
            if(res.status==200){
                setEdit(false);
            }
        }).catch(function(){
            setSnackbarInfo({open: true, text: 'Cannot save course. Please try again!', severity:'error'})
        });
    }

    return course==null ? <div style={{display:'flex', justifyContent:'center', marginTop:120}}><CircularProgress/></div>
    :<div>
        <div style={{display:'flex', justifyContent:'center', marginTop:75}}>
            {edit ? <TextField label='Title' variant='outlined' defaultValue={course.title} onChange={function(e){setTitle(e.target.value)}}/> : <Typography variant='h4'> {course.title}</Typography>}
        </div>
         
        <div style={{display:'flex', justifyContent:'center', marginTop:25}}>
            <Card style={{width:500, paddingLeft:20, paddingRight:20, paddingBottom:0}}>
                <div style={{display:'flex', justifyContent:'center', marginTop:35}}>
                    <CardMedia sx={{ height: 140, width:265}} image={course.imageLink} title={course.title} />
                </div>
                <CardContent>
                    <br />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        {edit ? <TextField label='Description' variant='outlined' defaultValue={course.description} size='small' onChange={function(e){setDescription(e.target.value)}}/> : <Typography variant='h6'>{course.description}</Typography>}
                    </div>
                    <br />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        {edit ? <TextField label='Price' variant='outlined' defaultValue={course.price} size='small' onChange={function(e){setPrice(e.target.value)}}/> : <Typography variant='h6'>{course.price}</Typography>}
                    </div>
                    <br />
                    <div style={{display:'flex', justifyContent:'end'}}>
                        {edit ? <Button variant='outlined' size='small' onClick={saveEditedCourse}>Save</Button> : <Button variant='outlined' size='small' onClick={editCourse}>Edit Course</Button>}
                    </div>
                </CardContent>
            </Card>
        </div>
        <Snackbar open={snackbarInfo.open} autoHideDuration={4000} onClose={function(){setSnackbarInfo({open:false, text:'', severity:'info'})}} anchorOrigin={{vertical:'bottom', horizontal:'center'}}><Alert severity={snackbarInfo.severity}>{snackbarInfo.text}</Alert></Snackbar>
    </div>

}
