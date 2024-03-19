const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const messageRoutes = require("./routes/messages");

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

// Routes
app.use("/api/messages", messageRoutes);

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
