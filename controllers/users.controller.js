var User = require("../models/users.model");

//Find all users
exports.users = async function(req, res) {
    try{
        const users= await User.find({});
        console.log(users);
        res.status(200).json(users);
    } catch (err){
        res.status(500).send({message: "Some error occurred while ..."});
    }
};

//Add  a new user
exports.addUser = async function (req, res) {
    try{
        console.log("This is reqbody:", req.body)
        const {userName, userGrade, userPassword} = req.body;

        //Check if user already exists
        const existingUser = await User.findOne({userName});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        //Create new User instance
        const newUser = new User ({
            userGrade,
            userName,
            userPassword,
        })

        //Save the new user to the database
        await newUser.save();

        res.status(201).json({message: "User added successfully", user:newUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to add user", erro: error.message});
    }
}

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