const express = require('express');

const blogRouter = require('./Routes/blogRoute');
const userRouter = require('./Routes/userRoute');



const app = express();


app.use(express.json());


app.use('/blog', blogRouter)







module.exports = app;
