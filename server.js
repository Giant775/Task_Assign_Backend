// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { createServer} from 'http';
import { initSocket } from "./services/socket.js";
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/tasks.route.js";

const app = express();
const httpServer = createServer(app);
const port = 5000;

// Initialize Socket.io
const io = initSocket(httpServer);

dotenv.config();

const dbUrl = process.env.MONGODB_URL;
mongoose
  .connect(dbUrl)
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log(error));

// app.use(cors());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
// Add io to requests
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api/auth",authRouter);
app.use("/api/tasks", taskRouter);


httpServer.listen(port, () => console.log(`server is running ${port}`));
