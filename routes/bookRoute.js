const Boom = require('boom');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authorizationCheck = require('../services/authFunction').authorizationCheck;
const checkToken = require('../services/authFunction').checkToken;
 
	router.get('/{id}',checkToken,async (req,res)=>{

	});

	router.get('/',checkToken,(req,res)=>{
	    res.status(200).send({ access_token: req.decoded});
	});
	router.post('',checkToken,authorizationCheck("admin"),async(req,res)=>{

	});

module.exports = router;