// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";


export const generateToken = (user) => {
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
    return token;
};

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.auth_token;


    if(!token) {
        return res.status(401).json  ({ error: "Unauthorized"});
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err){
            console.error("Failed to authenticate token: ", err);
            return res.status(403).json({eror: "Failed to authenticate token"});
        }

        req.user = user;
        next();
    })

}