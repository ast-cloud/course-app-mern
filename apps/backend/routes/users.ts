import express from 'express';
import jwt from 'jsonwebtoken';
import  { userAuth, SECRET }  from  "../middleware/";
import  { User, Course }  from "../db/";

const router = express.Router();

router.post('/signup', async (req, res) => {
    // logic to sign up user
    if(req.body.username && req.body.password){
      var a = await User.findOne({username: req.body.username});
      if(a){
        return res.status(401).json({message:'Username already exists'});
      }
      else{
        var newUser = new User({username: req.body.username, password: req.body.password});
        await newUser.save();
        var token = jwt.sign({username: req.body.username, role:'user'}, SECRET, {expiresIn: '1h'});
        return res.json({message:'User created successfully', token: token});
      }
    }
    else{
      return res.status(400).send({message:'Insufficient parameters supplied'});
    }
});
  
router.post('/login', async (req, res) => {
    // logic to log in user
    if(req.headers.username && req.headers.password){
      var a = await User.findOne({username:req.headers.username, password:req.headers.password});
      if(a){
        var token = jwt.sign({username: req.headers.username, role: 'user'}, SECRET, {expiresIn:'1h'});
        return res.json({message: 'Logged in successfully', token: token});
      }
      else{
        res.status(401).json({message:'Invalid credentials'});
      }
    }
    else{
      return res.status(400).send({message:'Insufficient parameters supplied'});
    }
});
  
router.get('/me', userAuth, async (req, res)=>{
    
    res.json({username: req.headers['username']});
});
  
router.get('/courses', userAuth, async (req, res) => {
    // logic to list all courses
    var a = await Course.find({published: true});
    res.json({courses: a});
});
  
router.get('/courses/:courseId', userAuth, async (req, res) => {
    // logic to purchase a course
    var courseId = req.params.courseId;
    var a = await Course.findById(courseId);
    console.log('a - '+JSON.stringify(a));
    if(a){
      var user = await User.findOne({username: req.headers['username']});
      if(user){
        //@ts-ignore
        user.purchasedCourses.push(a);
        await user.save();
        res.json({message: 'Course purchased successfully'});
      }
      else{
        res.status(404).json({message:'User not found'});
      }
    }
    else{
      res.status(401).json({message:'Course not found'});
    }
  
});
  
router.get('/purchasedCourses', userAuth, async (req, res) => {
    // logic to view purchased courses
    
    var user = await User.findOne({username: req.headers['username']});
    if(user){
      res.json({purchasedCoursesIds: user.purchasedCourses || []});
    }
    else{
      res.status(400).json({message:'User not found'});
    }
  
});
  
router.get('/course/:courseId', userAuth, async (req, res)=>{
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
