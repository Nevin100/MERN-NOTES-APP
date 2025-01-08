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
const Note = require("./models/noteModel.js");

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

  const accessToken = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "3600h",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registeration to account is Successfully",
  });
});

//login :
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
    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
      expiresIn: "3600h",
    });

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

//Routes :
//1.)Add Note :
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;
  if (!title) {
    return res.status(401).json({ error: true, message: "Title is required" });
  }
  if (!content) {
    return res
      .status(401)
      .json({ error: true, message: "Content is required" });
  }
  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();
    return res.status(200).json({
      error: false,
      note,
      message: "Note Added Successfully",
    });
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, message: "Internal Server Issue!" });
  }
});

//Edit Note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res
      .status(401)
      .json({ error: true, message: "No Changes Required" });
  }
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(401).json({ error: true, message: "Note Not Found" });
    }
    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (tags) {
      note.tags = tags;
    }
    if (isPinned) {
      note.isPinned = isPinned;
    }

    await note.save();
    return res.status(200).json({
      error: false,
      note,
      message: "Note Updated Successfully",
    });
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

//Get-All-Notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;
  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.status(200).json({
      error: false,
      notes,
      message: "All Notes are retrieved Successfully",
    });
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, message: "Intrernal Server Down" });
  }
});

//Delete-Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res
        .status(401)
        .json({ error: true, message: "Internal Server issue" });
    }

    await Note.deleteOne({ _id: noteId, userid: user._Id });

    return res.status(200).json({
      error: false,
      message: "Note successfully Deleted",
    });
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, message: "Internal Server Issue" });
  }
});
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("The Backend is connected to the Database ");
  app.listen(8000, () => {
    console.log(`App is listening on port 8000`);
  });
});
