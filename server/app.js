//1. Import express through require method
const express = require('express');
const cors = require('cors');




//Rouetrs
const { usersRouter } = require('./routes/users.routes');
const { postsRouter } = require('./routes/posts.route');



//2. create instance express app in app variable 
const app = express();

//Enable CORS
app.use(cors()); 


//11.Enable incoming JSON data
app.use(express.json());

// Endpoints
// http://localhost:4000/api/v1/users 
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);





 
module.exports = { app }






