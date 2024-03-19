const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connection à MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/raconte_ta_vie", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));
db.once("open", () => {
  console.log("Connecté à la base de données MongoDB");
});

// Schema et modèle MongoDB
const messageSchema = new mongoose.Schema({
  id: String,
  text: String,
  author: String,
  date: String,
});
const Message = mongoose.model("Message", messageSchema);

// Routes
// Route pour créer un nouveau message
app.post("/api/messages", async (req, res) => {
  try {
    const { id, text, author, date } = req.body;
    const newMessage = new Message({ id, text, author, date });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du message:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la sauvegarde du message" });
  }
});

// Route pour récupérer tous les messages
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des messages" });
  }
});

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
