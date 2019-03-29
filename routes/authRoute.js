const Boom = require('boom');
const express = require('express');
const mongoose = require('mongoose');
const jwt  =  require('jsonwebtoken');
const bcrypt  =  require('bcrypt'); 
const User = require('../models/User');
const verifyUniqueUser = require('../services/authFunction').verifyUniqueUser;
const verifyCredentials = require('../services/authFunction').verifyCredentials;
const createToken = require('../services/token');

const router = express.Router();

	router.post('/login',verifyCredentials,async (req,res)=>{ 
 		res.json({token:createToken(req.user)});
	});

	router.post('/signup',verifyUniqueUser,async(req,res)=>{
		let user =new User();
		user.email=req.body.email;
		user.username=req.body.username; 
		user.roles=req.body.roles || ['admin'];
		console.log(user.role);
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
		//I'll add blacklist for not expired tokens

	});

module.exports = router;
 