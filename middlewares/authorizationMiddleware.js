const checkPermission = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Non autorisé" });
    }
    next();
  };
};

module.exports = checkPermission;
