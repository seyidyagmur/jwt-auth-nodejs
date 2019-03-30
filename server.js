require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const glob=require('glob');
const boom = require('express-boom');

const keys=require('./config/keys');
const path = require('path');
const authRoute = require('./routes/authRoute');
const bookRoute = require('./routes/bookRoute');
const checkToken = require('./services/authFunction').checkToken;

const app=express();
app.use(boom());

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI,{useNewUrlParser: true});
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(bodyParser.urlencoded({ extended: false }))

//use routes

app.use('/',  (req, res,next)=>{
   	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
}); 
 app.use('/auth',authRoute);
 app.use('/books',checkToken,bookRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
	console.log('Listenin port ',PORT);
})