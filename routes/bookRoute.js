const Boom = require('boom');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
 
	router.get('/{id}',async (req,res)=>{

	});

	router.get('/',(req,res)=>{
	    res.status(200).send({ access_token:  '' });
	});
	router.post('',async(req,res)=>{

	});

module.exports = router;