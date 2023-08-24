import express from 'express';
import jwt from 'jsonwebtoken';
import  { adminAuth, SECRET }  from  "../middleware/";
import  { Admin, Course }  from "../db/";

const router = express.Router();

router.post('/signup', async (req, res) => {
    // logic to sign up admin
    if(req.body.username && req.body.password){
      
      var a = await Admin.findOne({username:req.body.username});
  
      if(a){
        res.status(401).send('Username already exists.');
      }
      else{
        var newEntry = new Admin({username:req.body.username, password:req.body.password});
        await newEntry.save();
        var token = jwt.sign({username:req.body.username, role: 'admin'}, SECRET, {expiresIn:'1h'});
        res.status(200).send({ message: 'Admin created successfully', token:token });
      }
    }
    else{
      res.status(400).send('Insufficient parameters supplied.');
    }
});

router.post('/login', async (req, res) => {
    // logic to log in admin
    if(req.headers.username && req.headers.password){
      var a = await Admin.findOne({username:req.headers.username, password:req.headers.password});
      if(a){
        var token = jwt.sign({username:req.body.username, role: 'admin'}, SECRET, {expiresIn:'1h'});
        res.json({ message: 'Logged in successfully', token: token });
      }
      else{
        res.status(401).json({message:'Invalid credentials'});
      }
    }
    else{
      res.status(400).send('Insufficient parameters supplied.');
    }
});

router.get('/me', adminAuth, (req,res)=>{
  res.json({username: req.headers['username']});
});
  
router.post('/courses', adminAuth, async (req, res) => {
    // logic to create a course
    var newCourse = req.body;
    if(newCourse.title && newCourse.description && newCourse.price && newCourse.imageLink && newCourse.published){
     
      var a = new Course(newCourse);
      await a.save();
  
      res.json({message:'Course created successfully', courseId: a.id});
    }
    else{
      res.status(400).send({message:'Insufficient parameters supplied'});
    }
});
  
router.put('/courses/:courseId', adminAuth, async (req, res) => {
    // logic to edit a course
    var courseId = req.params.courseId;
    var a = await Course.findByIdAndUpdate(courseId, req.body, {new: true});
    if(a){
      res.json({ message: 'Course updated successfully' });
    }
    else{
      res.status(401).json({ message: 'Course not found' });
    }
});
  
router.get('/courses', adminAuth, async (req, res) => {
    // logic to get all courses
    var a = await Course.find({});
    res.json({courses: a});
});
  
router.get('/course/:courseId', adminAuth, async (req, res)=>{
    var courseId = req.params.courseId;
    var a = await Course.findById(courseId);
    if(a){
      res.status(200).json({course: a});
    }
    else{
      res.status(404).json({message:'Course not found'});
    }
});

export default router;
