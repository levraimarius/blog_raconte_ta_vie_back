const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.status(401).json({ message: "Le cookie d'identification de session est requis" });
  }

  try {
    const decodedSession = jwt.verify(sessionId, process.env.SESSION_SECRET);
    req.user = decodedSession.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Cookie d'ID de session invalide" });
  }
};

module.exports = authenticateUser;
