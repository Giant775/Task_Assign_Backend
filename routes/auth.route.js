import * as users from "../controllers/auth.controller.js";
import express from "express"

const authRouter = express.Router();

authRouter.post("/login", users.signIn);
authRouter.post("/signup", users.signup);
authRouter.get("/me", users.isMe);
// const authRoutes = (app) => {
//     // var users = require("../controllers/auth.controller.js");
    
//     //Route to fetch all users
//     app.post('/login', users.signIn);

    
// }

export default authRouter;