const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const bookModel=new Schema({
	book_name:{type:String,required:true},
	author:{type:String,required:true},
	book_image:{type:String,required:true},
	publisher_name:{type:String,required:true},
	publish_year:{type:String,required:true},
	user:{type:Schema.Types.ObjectId,ref:'User'}
});
module.exports=mongoose.model('Book',bookModel);