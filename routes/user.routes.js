const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
require('dotenv').config();
const jwt = require('jsonwebtoken')

const userRouter = express.Router();


userRouter.post("/api/register", async (req, res) => {
    const { name, email, password, address } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);
      const user = new UserModel({ name, email, password: hash, address });
      await user.save();
      res.send("user register")
      res.sendStatus(201);
    } catch (error) {
        console.log(error)
      res.sendStatus(500);
    }
  });
  
  userRouter.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.sendStatus(401);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.sendStatus(401);
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(201).send({ token });
    } catch (error) {
      res.sendStatus(error.message);
    }
  });
  
  userRouter.put("/api/user/:id/reset", async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res.sendStatus(404);
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.sendStatus(401);
      }
      const hash = await bcrypt.hash(newPassword, 10);
      user.password = hash;
      await user.save();
      res.sendStatus(204);
    } catch (error) {
      res.sendStatus(500);
    }
  });

module.exports = 
  { userRouter } ;



