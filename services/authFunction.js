const User = require('../models/User');
const bcrypt = require('bcrypt');
 let jwt = require('jsonwebtoken');
const secret=require('../config/keys').JWT_SECRET_KEY;

function verifyUniqueUser(req, res,next) {
  User.findOne({ 
    $or: [ 
      { email: req.body.email }, 
      { username: req.body.username }
    ]
  }, (err, user) => {
    if (user) {
      if (user.username === req.body.username) {
        res.boom.badRequest('Username taken');
        return;
      }
      if (user.email === req.body.email) {
        res.boom.badRequest('Email taken');
        return;
      }
    }
    next();
  });
}

function verifyCredentials(req,res,next){
	console.log("body");
	console.log(req.body);
const password = req.body.password;
	User.findOne({ 
	    $or: [ 
	      { email: req.body.email },
	      { username: req.body.email }
  	    ]
	  },
	   (err, user) => {
	    if (user) {
	      bcrypt.compare(password, user.password, (err, isValid) => {
	        if (isValid) {
	        	req.user=user;
	          next();
	        }
	        else {
	          res.boom.badRequest('Incorrect password!');
	        }
	      });
	    } else {
	      res.boom.badRequest('Incorrect username or email!');
	    }
	  });
}

function authorizationCheck(...allowedRoles){
	return (req,res,next)=>{
		let roles=allowedRoles;
	  	let user=req.decoded;
	  	 if(!req || !user) {
	           next();
	        }
	     const userRoles = user.roles || [];
	     const foundRoles = roles.filter(r => userRoles.some(ur => ur === r));
			if (!foundRoles.length) {
	         return res.boom.forbidden('You dont have permission to do this');
	        }
	  	next();
	}
}
function checkToken(req,res,next)
	{
	  let token = req.headers['x-access-token'] || req.headers['authorization'] || "";
	  if(token=="")
	   return res.boom.badRequest('Token is not valid');

	  if (token.startsWith('Bearer ')) {
	    token = token.split(' ')[1];
	  }
	  if (token) {
	    jwt.verify(token, secret, (err, decoded) => {
	      if (err) {
          res.boom.badRequest('Token is not valid');
	      } else {
	        req.decoded = decoded;
	        next();
	      }
	    });
	  } else {
	    res.boom.badRequest('Token is not valid');
	  }
	}
module.exports = {
  verifyUniqueUser: verifyUniqueUser,
  verifyCredentials:verifyCredentials,
  authorizationCheck:authorizationCheck,
  checkToken:checkToken
}