const Boom = require('boom');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authorizationCheck = require('../services/authFunction').authorizationCheck;
 
	router.get('/{id}',async (req,res)=>{

	});

	router.get('/',(req,res)=>{
	    res.status(200).send({ access_token: req.decoded});
	});
	router.post('',authorizationCheck("admin"),async(req,res)=>{

	});

module.exports = router;