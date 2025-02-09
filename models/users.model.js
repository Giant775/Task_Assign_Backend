var mongoose = require("mongoose");
//user model
const Schema = mongoose.Schema;
const userModelSchema = new Schema({
    userId : Schema.Types.ObjectId,
    userGrade : Number,
    userName : {type : String, required : true},
    userPassword : {type : String, required : true}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
});
module.exports = mongoose.model("users", userModelSchema);