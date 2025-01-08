require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const { authenticateToken } = require("./utilis.js");
const User = require("./models/userModel.js");

//Create Account :
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName) {
    return res
      .status(401)
      .json({ error: true, message: "Please enter your full name" });
  }
  if (!email) {
    return res
      .status(401)
      .json({ error: true, message: "PLease enter the email" });
  }
  if (!password) {
    return res
      .status(401)
      .json({ error: true, message: "Please enter the password" });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.json({ error: true, message: "User already exists" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN);

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registeration to account is Successfully",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(401).json({ error: true, message: "Email is required!" });
  }
  if (!password) {
    return res
      .status(401)
      .json({ error: true, message: "Password is required!" });
  }

  const userInfo = await User.findOne({
    email,
  });

  if (!userInfo) {
    return res
      .status(401)
      .json({ error: true, message: "No Such User Exists" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN);

    return res.json({
      error: false,
      message: "Login Successfully",
      email,
      accessToken,
    });
  } else {
    return res.status(401).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("The Backend is connected to the Database ");
  app.listen(8000, () => {
    console.log(`App is listening on port 8000`);
  });
});
