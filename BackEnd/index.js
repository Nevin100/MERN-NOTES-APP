//Using the required dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const app = express();
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilitis.js");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

//model
const User = require("./models/UserModels.js");
const Note = require("./models/AddNotesModels.js");
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
  //using jwt auth here
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });
  //final response
  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registeration Successful",
  });
});

//login:
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(401).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(401)
      .json({ error: true, message: "Password is required" });
  }
  const userInfo = await User.findOne({ email: email });
  if (!userInfo) {
    return res.status(401).json({ error: true, message: "No User found" });
  }

  if (userInfo.email === email && userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "3600m",
    });
    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    res.status(401).json({
      error: true,
      message: "Invalid Email or Password",
    });
  }
});

//Add-Notes:
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;
  //Checking if the title or content or tag are empty?
  if (!title) {
    res.status(401).json({
      error: true,
      message: "Title is required",
    });
  }
  if (!content) {
    res.status(401).json({
      error: true,
      message: " Content is required",
    });
  }
  if (!tags) {
    res.status(401).json({
      error: true,
      message: "Tags are required",
    });
  }
  //try this: where title,content, tags, user_id are the fields in the database
  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    //note is going to be save here
    await note.save();

    //return the response
    return res.json({
      error: false,
      note,
      message: "Note Added succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error", //displaying error
    });
  }
});

//mongoose event listening
mongoose
  .connect(process.env.MongoURL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
