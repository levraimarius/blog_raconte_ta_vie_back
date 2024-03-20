const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel");

router.post("/", async (req, res) => {
  try {
    const { text, author, date } = req.body;
    const newMessage = new Message({ text, author, date });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du message :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la sauvegarde du message" });
  }
});

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des messages" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const messageId = req.params.id;
    const { text } = req.body;
    await Message.findByIdAndUpdate(messageId, { text });
    res.status(204).end();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du message :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du message" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const messageId = req.params.id;
    await Message.findByIdAndDelete(messageId);
    res.status(204).end();
  } catch (error) {
    console.error("Erreur lors de la suppression du message :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du message" });
  }
});

module.exports = router;
