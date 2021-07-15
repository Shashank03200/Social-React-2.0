const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.header('x-auth-token');
        console.log(token);
        // Check for token
        if (!token) res.status(401).json({ msg: "No token authorization denied" });
        // Verify decoded
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        console.log(decoded);
        // Add user from payload
        req.user = decoded.id;
        next();
    } catch (e) {
        res.status(400).json(e);
    }
}

module.exports = auth;