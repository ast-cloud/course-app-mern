import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRoutes from './routes/admin';
import userRoutes from './routes/users';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);



mongoose.connect('mongodb+srv://astk:qwerty1234@cluster0.v0dgsju.mongodb.net/CoursesApp');


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});