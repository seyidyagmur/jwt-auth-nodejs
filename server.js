require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const glob=require('glob');
const boom = require('express-boom');

const keys=require('./server/config/keys');
const path = require('path');
const authRoute = require('./server/routes/authRoute');
const bookRoute = require('./server/routes/bookRoute');
const checkToken = require('./server/services/authFunction').checkToken;
var cors = require('cors')

const app=express();
app.use(boom());

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI,{useNewUrlParser: true});
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

app.use('/',  (req, res,next)=>{
/*  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
*/
   next();
}); 
 app.use('/auth',authRoute);
 app.use('/books',checkToken,bookRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
	console.log('Listenin port ',PORT);
})