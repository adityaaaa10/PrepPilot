const express = require('express');



const app = express();
app.use(express.json());



const authRoutes = require('./routes/auth.routes');//require all the auth routes here

app.use('/api/auth', authRoutes);//use all the auth routes here

module.exports = app;