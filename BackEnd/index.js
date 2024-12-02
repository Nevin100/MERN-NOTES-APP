const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const app = express();
const jwt = require("jsonwebtoken");
const { authentication } = require("./utilitis.js");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const User = require("./models/UserModels.js");
//Create Account :
app.post("/create-account", async (req, res) => {
  //Getting data inputs from the user
  const { fullName, email, password } = req.body;
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "password is required" });
  }
  //Checking if the user already exists
  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res
      .status(401)
      .json({ error: true, message: "User already exists" });
  }
  //else New User
  const user = new User({ fullName, email, password });

  //Save the neww details
  await user.save();
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registeration Successful",
  });
});

mongoose
  .connect(process.env.MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
