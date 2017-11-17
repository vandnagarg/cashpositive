var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var replySchema = new Schema({
	author:{type:String,required:true},
	text:{type:String,required:true}
})
var schema = new Schema({
	title:{type:String,required:true},
	date:{type:String,required:true},
	organiser:{type:String,required:true},
	location:{type:String,required:true},
	description:{type:String,required:true},
	ticketPrice:{type:String,required:true},
	comments:[replySchema]
})

module.exports = mongoose.model('Event',schema);