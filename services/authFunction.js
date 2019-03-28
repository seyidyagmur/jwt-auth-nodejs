const User = require('../models/User');
const bcrypt = require('bcrypt');
const Boom = require('boom');

function verifyUniqueUser(req, res,next) {
  User.findOne({ 
    $or: [ 
      { email: req.body.email }, 
      { username: req.body.username }
    ]
  }, (err, user) => {
    if (user) {
      if (user.username === req.body.username) {
        res.json(Boom.badRequest('Username taken'));
        return;
      }
      if (user.email === req.body.email) {
        res.json(Boom.badRequest('Email taken'));
        return;
      }
    }
    next();
  });
}

function verifyCredentials(req,res,next){
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
		          res.json(Boom.badRequest('Incorrect password!'));
		        }
		      });
		    } else {
		      res.json(Boom.badRequest('Incorrect username or email!'));
		    }
		  });

}

module.exports = {
  verifyUniqueUser: verifyUniqueUser,
  verifyCredentials:verifyCredentials
}