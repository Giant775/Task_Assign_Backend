const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
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

require("./routes/auth.route.js")(app);

app.listen(port, () => console.log(`server is running ${port}`));
