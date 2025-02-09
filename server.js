// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";

const app = express();
dotenv.config();

// app.use(cors());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
const dbUrl = process.env.MONGODB_URL;
console.log(dbUrl);
mongoose
  .connect(dbUrl)
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log(error));

const port = 5000;

app.use("/api/auth",authRouter);

app.listen(port, () => console.log(`server is running ${port}`));
