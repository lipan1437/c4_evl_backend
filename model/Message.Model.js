const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  title: String,
  body: String,
  device: String,
  comments: Number,
});

const MessageModel = mongoose.model("userPost", messageSchema);

module.exports = { MessageModel };
