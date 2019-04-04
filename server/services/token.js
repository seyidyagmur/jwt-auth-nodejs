const jwt = require('jsonwebtoken');
const createGravatarUrl = require('./createGravatar');
const secret=require('../config/keys').JWT_SECRET_KEY;
function createToken(user){
	console.log(secret);

	return jwt.sign({
		id:user.id,
		username:user.username,
		roles:user.roles,
		gravatar:createGravatarUrl(user.email),
	},
	secret,
	{
      algorithm: 'HS256',
      expiresIn: '1h'
    });

}

module.exports=createToken;