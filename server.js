const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/raconte_ta_vie", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur de connexion à MongoDB :"));
db.once("open", () => {
  console.log("Connecté à la base de données MongoDB");
});

app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
