const keys=require('../config/keys');
const redis = require('redis');
const util = require('util');

const client = redis.createClient(keys.redisUrl);
client.get = util.promisify(client.get);

 	 async function inBlackList(token){
		const cacheValue= await client.get(token);
		if(cacheValue || cacheValue=="")
			return true;
		return false;
	}

	async function storeInBlackList(token,decoded){
		const isInBlackList=await inBlackList(token);
		if(!isInBlackList){
		 let expireInSecond=getRemainingSecond(decoded.exp);
 		 client.set(token, "",'EX',expireInSecond);
		}
	}

	function getRemainingSecond(val){
		let date=new Date(0).setUTCSeconds(val);
		return Math.floor((date.valueOf()-new Date().valueOf())/1000);
	}

 module.exports={
	inBlackList:inBlackList,
	storeInBlackList:storeInBlackList
}
	
 