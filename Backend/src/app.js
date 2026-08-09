const express = require('express');
const cookieParser = require('cookie-parser');



const app = express();
app.use(express.json());
app.use(cookieParser());



const authRoutes = require('./routes/auth.routes');//require all the auth routes here

app.use('/api/auth', authRoutes);//use all the auth routes here

module.exports = app;