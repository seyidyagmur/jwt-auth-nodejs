const Boom = require('boom');
const express = require('express');
const mongoose = require('mongoose');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcrypt'); 
const User = require('../models/User');
const verifyUniqueUser = require('../services/authFunction').verifyUniqueUser;
const verifyCredentials = require('../services/authFunction').verifyCredentials;
const createToken = require('../services/token');

const router = express.Router();
	router.post('/login',verifyCredentials,async (req,res,data)=>{ 

		console.log(data);

	});

	router.post('/signup',verifyUniqueUser,async(req,res)=>{
		let user =new User();
		user.email=req.body.email;
		user.username=req.body.username; 
		user.role=req.body.role || 'admin';
		let hash = bcrypt.hashSync(req.body.password, 10);
		user.password=hash;
		user.save((err, user) => {
	       if (err) {
	         throw Boom.badRequest(err);
	       }
       		 res.json({ token:createToken(user) });
        });
	});

	router.post('/logout',async(req,res)=>{

	});

module.exports = router;
 