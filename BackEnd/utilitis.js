const jwt = require("jsonwebtoken");

function authrnticateToken(req, res, next) {
  const authHeader = req.headers("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
  }
  jwt.verify(token, proess.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

module.exports = { authrnticateToken };
