const Boom = require('boom');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Book=require('../models/Book');
const authorizationCheck = require('../services/authFunction').authorizationCheck;
 
	router.get('/{id}',async (req,res)=>{
      const _id = req.params.id;
      Book.findOne({_id}).select('-__v')
		   .populate('user',{_id:1,email:1,username:1})
       	   .exec((err, data) => {
	          if (err) {
	            res.json(Boom.badRequest(err));
	            return;
	          }
	          if (!data) {
	            res.json(Boom.notFound('Instructor not found!'));
	            return;
	          }
	          res.json(data);
	        });

	});

	router.get('/',(req,res)=>{
		Book.find().select('-__v')
			.populate('user',{_id:1,email:1,username:1})
			.exec((err,data)=>{
				if(err)
				return res.json(Boom.badRequest(err));
				if(!data.length)
        	   	return res.json(Boom.notFound('No book found!'));
        	 	res.json(data);
			});
	});
	router.post('',authorizationCheck("admin"),async(req,res)=>{
		let book=new Book(req.body);
		book.user=req.decoded.id;
 
		book.save((err,data)=>{
				if(err){
				 res.json(Boom.badRequest(err));
				 return
				}
    	    res.json({ message: 'Book created!', data }).status(201);

		})
	});

module.exports = router;