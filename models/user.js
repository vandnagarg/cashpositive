var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
	email:{type:String,required:true},
	password:{type:String,required:true},
	type:{type:String},


});
userSchema.methods.encryptPassword = function(password){
   return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null)
};
userSchema.methods.validPassword = function (password,callback) {
    return bcrypt.compare(password,this.password,callback);  // this refers to actual password
};

module.exports = mongoose.model('User',schema);