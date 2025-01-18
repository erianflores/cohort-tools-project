const express = require("express");
const router = express.Router();
const userModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
const authenticateUser = require("../middlewares/auth.middleware");

router.post("/signup", async (req, res) => {
  console.log("here is the req.body", req.body);
  try {
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
    const hashedUser = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    const createdUser = await userModel.create(hashedUser);
    console.log("user created, nice work", createdUser);
    res.status(201).json({ message: "user created", createdUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
  // res.status(200).json({message: "made ir here, nice work"})
});

router.post("/login", async (req, res) => {
  try {
    const foundUser = await UserModel.findOne({ email: req.body.email });
    if (!foundUser) {
      res.status(403).json({ message: "Invalid Credentials" });
    } else {
      const doesPasswordsMatch = bcryptjs.compareSync(
        req.body.password,
        foundUser.password
      );
      console.log("does the password match", doesPasswordsMatch);
      if (doesPasswordsMatch) {
        const data = { _id: foundUser._id, username: foundUser.username };
        const authToken = jwt.sign(data, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "1h",
        });
        res.status(200).json({ message: "successful login", authToken });
      } else {
        res.status(403).json({ message: "Invalid Credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in the user" });
  }
});

router.get("/verify", authenticateUser, async (req, res) => {
  console.log("verify route", req.payload);
  res.status(200).json({ message: "token is valid", currentUser: req.payload });
});

module.exports = router;

// const { email, password, name } = req.body;
// if (email === '' || password === '' || name === '') {
//     res.status(400).json({ message: "Provide email, password and name" });
//     return;
//       }
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
//       if (!emailRegex.test(email)) {
//         res.status(400).json({ message: 'Provide a valid email address.' });
//         return;
//       }
//       const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
//   if (!passwordRegex.test(password)) {
//     res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
//     return;
//   }
//   User.findOne({ email })
//   .then((foundUser) => {
//     // If the user with the same email already exists, send an error response
//     if (foundUser) {
//       res.status(400).json({ message: "User already exists." });
//       return;
//     }

//

//
//

// router.post("/auth/login", async (req, res) => {
//     try {
//       const user = await userModel.create(req.body);
//       res.status(201).json(user);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

// router.get("/auth/verify", async (req, res) => {
//   try {
//     const user = await userModel.find();
//     res.status(200).json(students);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
