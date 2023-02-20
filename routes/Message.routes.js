const express = require("express");
const { MessageModel } = require("../model/Message.Model");

const messageRouter = express.Router();

messageRouter.get("/", async (req, res) => {
  const message = await MessageModel.find();
  res.send(message);
});

messageRouter.post("/posts", async (req, res) => {
  const payload = req.body;
  try {
    const  new_post = new MessageModel(payload);
    await new_post.save();
    res.send({ msg: "post created successfully" });
  } catch (err) {
    res.send(400).json({ msg: "Something Went Wrong" });
  }
});

messageRouter.patch("/posts/update/:id", async (req, res) => {
  const id = req.params.id;
  const userID = req.body.id;
  try {
    const new_post = await MessageModel.findOne({ _id: id });
    if (userID !== new_post.id) {
      res.send("Not authorised");
    } else {
      await MessageModel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ msg: "Post updated successfully" });
    }
  } catch (err) {
    res.send(400).send({ msg: "Something Went Wrong" });
  }
});

messageRouter.delete("/posts/delete/:id", async (req, res) => {
  const  id = req.params.id;
  const userID = req.body.id;
  const new_post = await MessageModel.findOne({ _id: id });
  if (userID !== new_post.userID) {
    res.send("Not authorised");
  } else {
    await MessageModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Post deleted successfully" });
  }
});

module.exports = { messageRouter };
