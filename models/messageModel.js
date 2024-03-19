const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: String,
  author: String,
  date: String,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
