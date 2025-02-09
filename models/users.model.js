// var mongoose = require("mongoose");
import mongoose from "mongoose";

//user model
const Schema = mongoose.Schema;
const userModelSchema = new Schema({
    id : Schema.Types.ObjectId,
    grade : Number,
    email : {type : String, required : true},
    password : {type : String, required : true}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
});

const User = mongoose.model("users", userModelSchema);

export default User;