require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const glob=require('glob');
const keys=require('./config/keys');
const path = require('path');

const app=express();

mongoose.connect(keys.mongoURI,{useNewUrlParser: true});
app.use(bodyParser.json());

//import routes
glob.sync('routes/*.js',{root:__dirname}).forEach(file=>{
	require(path.join(__dirname, file))(app);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
	console.log('Listenin port ',PORT);
})