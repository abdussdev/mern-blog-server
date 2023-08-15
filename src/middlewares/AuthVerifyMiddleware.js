const jwt = require("jsonwebtoken");

const AuthVerifyMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Authentication token missing." });
  }

  try {
    const decoded = jwt.verify(token, "MERNblog123");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = AuthVerifyMiddleware;
