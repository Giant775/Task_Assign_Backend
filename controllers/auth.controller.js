import bcrypt from "bcrypt"
// import jwt from 'jsonwebtoken'

var User = require("../models/users.model");
// import User from "../models/users.model"
const jwtservice = require("../services/jwtservice");
// import jwtservice from "../services/jwtservice"

// Control signina
exports.signIn = async function(req, res) {
    try{
        // console.log("request: ",req);
        const {email, password} = req.body;
        const user= await User.findOne({
            userEmail : email,
        });
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(404).json({
                error: "Invalid credentials",
            })
        }
        const token = jwtservice.generateToken(user);
        const data = {
            userEmail: user.userEmail,
            userGrade: user.userGrade
        }
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        });
        res.status(200).send({message: "Login successful", user: data});
    } catch (err){
        console.log('Error in signIn: ', err.message);
        res.status(500).send({message: "Some error occurred while ..."});
    }
};


//Add  a new user
exports.signup = async function (req, res) {
    try{
        console.log("This is reqbody:", req.body)
        const {userEmail, userGrade, userPassword} = req.body;
        
        //Check if user already exists
        const existingUser = await User.findOne({userEmail});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        
        // Create new User instance
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const newUser = new User ({
            userGrade,
            userEmail,
            hashedPassword,
        })
        
        //Save the new user to the database
        await newUser.save();
        const token = jwtservice.generateToken(newUser);

        // Set token in HttpOnly cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        });
        
        res.status(201).json({message: "User added successfully", user:newUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to add user", erro: error.message});
    }
}

// **Auth Check API**
// exports.isMe = async function(req, res) {
//     const token = req.cookies.auth_token;
//     if (!token) return res.status(401).send({error: "Not authenticated"});

//     try {
//         const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         res.json({authenticated: true, user});
//     } catch (error) {
//         res.status(403).json({error: "Invalid token"});
//     }
// }

// Find all users
exports.users = async function(req, res) {
    try{
        const users= await User.find({});
        console.log(users);
        res.status(200).json(users);
    } catch (err){
        res.status(500).send({message: "Some error occurred while ..."});
    }
};



//Delete a user
exports.deleteUser = async function (req,res) {
    try {
        const {id}= req.params;
        
        //Find the user by their ID and delete
        const deleteUser = await User.findByIdAndDelete(id);
        
        if(!deleteUser){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully", user: deleteUser});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Failed to delete user", error: error.message});
    }
}