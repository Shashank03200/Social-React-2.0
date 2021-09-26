const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.header("Authorization");
    // Check for token
    console.log("Token ", token);
    if (!token)
      return res.status(401).json({ msg: "No token authorization denied" });
    // Verify decoded
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log(decoded);
    // Add user from payload
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(400).json(e);
  }
}

module.exports = auth;
