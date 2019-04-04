const express = require('express');
const mongoose = require('mongoose');
const jwt  =  require('jsonwebtoken');
const bcrypt  =  require('bcrypt'); 
const User = require('../models/User');
const verifyUniqueUser = require('../services/authFunction').verifyUniqueUser;
const verifyCredentials = require('../services/authFunction').verifyCredentials;
const checkToken = require('../services/authFunction').checkToken;
const cache = require('../services/cache');
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
		let hash = bcrypt.hashSync(req.body.password, 10);
		user.password=hash;
		user.save((err, user) => {
	       if (err) {
	          res.boom.badRequest(err);
	       }
       		 res.json({ token:createToken(user) });
        });
	});

	router.get('/logout',checkToken,async(req,res)=>{
		//if token not expired
		await cache.storeInBlackList(req.token,req.decoded);
		res.json({result:"OK"})
	});

module.exports = router;
 