import bcrypt from "bcrypt"
// import jwt from 'jsonwebtoken'

// var User = require("../models/users.model");
// const jwtservice = require("../services/jwtservice");
import User from "../models/users.model.js";
import {generateToken} from "../services/jwtservice.js";



// Control signina
export const signIn = async function(req, res) {
    console.log("request body:", req.body);
    try{
        const {email, password} = req.body;
        console.log("email:", email);
        console.log("password:", password);
        const user= await User.findOne({
            email : email
        });
        console.log("user:",user);
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(404).json({
                error: "Invalid credentials",
            })
        }
        
        const token = generateToken(user);
        const data = {
            email: user.email,
            grade: user.grade
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
export const signup = async function (req, res) {
    try{
        console.log("This is reqbody:", req.body)
        const {name, email, password} = req.body;
        const grade = 1;
        //Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        
        // Create new User instance
        const salt = await bcrypt.genSalt(10);
        console.log("salt:", salt);
        console.log("userPassw0rd:", password);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User ({
            grade,
            name,
            email,
            password: hashedPassword,
        })
        
        //Save the new user to the database
        await newUser.save();
        const token = generateToken(newUser);

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

// // Find all users
// exports.users = async function(req, res) {
//     try{
//         const users= await User.find({});
//         console.log(users);
//         res.status(200).json(users);
//     } catch (err){
//         res.status(500).send({message: "Some error occurred while ..."});
//     }
// };



// //Delete a user
// exports.deleteUser = async function (req,res) {
//     try {
//         const {id}= req.params;
        
//         //Find the user by their ID and delete
//         const deleteUser = await users.findByIdAndDelete(id);
        
//         if(!deleteUser){
//             return res.status(404).json({message: "User not found"});
//         }
//         res.status(200).json({message: "User deleted successfully", user: deleteUser});
//     } catch(error) {
//         console.log(error);
//         res.status(500).json({message: "Failed to delete user", error: error.message});
//     }
// }