var login = require("../models/users.model");
const jwtservice = require("../services/jwtservice");

exports.signIn = async function(req, res) {
    try{
        // console.log("request: ",req);
        const user= await login.findOne({
            userName : req.body.userName,
            userPassword : req.body.userPassword
        });
        if(!user) {
            return res.status(404).json({
                error: "User doesn't exist",
            })
        }
        const token = jwtservice.generateToke(user);
        const data = {
            userName: user.userName,
            userToken: token,
            userGrade: user.userGrade
        }
        res.status(200).send(data);
    } catch (err){
        console.log('Error in signIn: ', err.message);
        res.status(500).send({message: "Some error occurred while ..."});
    }
};