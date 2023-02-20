const express = require("express");
const { UserModel } = require("../model/User.Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const userRouter = express.Router();
userRouter.get("/", (req, res) => {
  res.send("user Page");
});

userRouter.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const user = new UserModel(payload);
    res.send("Registerd successful");
    await user.save();
  } catch (err) {
    res.send({ msg: "Something went wrong", err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.find({ email });
  
      if (user.length > 0) {
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function (err, result) {
          if (result) {
            const token = jwt.sign({ userID: user[0]._id }, "hush");
            res.send({ msg: "Login successfull", token: token });
          } else {
            res.send("Login failed");
          }
        });
      } else {
        res.send("Login failed");
      }
    } catch {
      res.send("Something went wrong, please try again later");
    }
  });

module.exports = { userRouter };
