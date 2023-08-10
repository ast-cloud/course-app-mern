import { useEffect, useState } from 'react';
import { Typography, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

export default function PurchasedCourses() {

    const [purchasedCourses, setPurchasedCourses] = useState(null);

    useEffect(function(){
        axios.get('http://localhost:3000/users/purchasedCourses', {
            headers: {
            'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(function(res){
            getCourseDetails(res.data.purchasedCoursesIds);
        });
    },[]);
    
    async function getCourseDetails(Ids){
        var pCourses = [];
        for(var i=0;i<Ids.length;i++){
            var r = await axios.get('http://localhost:3000/users/course/'+Ids[i], {
                headers: {
                    'Authorization':'Bearer '+localStorage.getItem('token')
                }
            });
            pCourses.push(r.data.course);
        }
        setPurchasedCourses(pCourses);
    }

  return (
    purchasedCourses==null ?
    <div>
      Loading data...
    </div>
    : <div>
        <div style={{display:'flex', justifyContent:'center', marginTop:45}}>
          <Typography variant='h5'>Courses</Typography>
        </div>
        <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', marginLeft:80, marginRight:80 }}>
            {purchasedCourses.map(c => <div key={c._id}> <Course id={c._id} title={c.title} image={c.imageLink} description={c.description} price={c.price} /> </div>)}
        </div>
    </div>
  )
}

function Course(props) {

    return <Card style={{marginTop:40, marginRight:20}}>
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