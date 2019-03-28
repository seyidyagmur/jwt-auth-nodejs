require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const glob=require('glob');
const keys=require('./config/keys');
const path = require('path');
const authRoute = require('./routes/authRoute');
const bookRoute = require('./routes/bookRoute');

const app=express();

mongoose.connect(keys.mongoURI,{useNewUrlParser: true});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//use routes
 app.use('/auth',authRoute);
 app.use('/books',bookRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
	console.log('Listenin port ',PORT);
})