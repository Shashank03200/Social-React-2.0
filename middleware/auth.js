const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const accessToken = req.header("Authorization");
    // Check for accessToken
    console.log("accessToken ", accessToken);
    if (!accessToken)
      return res
        .status(401)
        .json({ msg: "No accessToken authorization denied" });
    // Verify decoded
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    console.log(decoded);
    // Add user from payload
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(400).json(e);
  }
}

module.exports = auth;
