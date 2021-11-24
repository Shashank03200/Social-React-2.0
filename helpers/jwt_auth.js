const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const client = require("./init_redis");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "instagram.com",
        audience: userId,
      };

      JWT.sign(payload, secret, options, (err, accessToken) => {
        if (err) {
          console.log(err);
          return reject(
            createError.InternalServerError("Bhaut eerror h bhaii")
          );
        } else {
          resolve(accessToken);
        }
      });
    });
  },

  verifyAccessToken: (req, res, next) => {

    if (!req.headers["authorization"]) return next(createError.Unauthorized());

    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const accessToken = bearerToken[1];

    JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      try {
        if (err) {
          console.log('TOken Invallid');
          const message =
            err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
          err.message = message;
          next(createError.Unauthorized(err));
        }
        
        req.userId = payload.aud;
      } catch (error) {
        next(error.message);
      }
    });

    next();
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "instagram.com",
        audience: userId,
      };

      JWT.sign(payload, secret, options, (err, refreshToken) => {
        if (err) {
          console.log(err);
          reject(createError.InternalServerError());
        } else {
          client.set(
            userId,
            refreshToken,
            "EX",
            365 * 24 * 60 * 60,
            (err, reply) => {
              if (err) {
                console.log(err);
                reject(createError.InternalServerError());
                return;
              }
              console.log(reply);
              resolve(refreshToken);
            }
          );
        }
      });
    });
  },

  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) {
            return reject(createError.Unauthorized());
          }
          console.log(payload);
          const userId = payload.aud;
          console.log(userId);
          client.get(userId, (err, result) => {
            if (err) {
              console.log(err.message);
              reject(createError.InternalServerError());
              return;
            }
            if (refreshToken === result) return resolve(userId);
            else reject(createError.Unauthorized());
          });
          return resolve(userId);
        }
      );
    });
  },
};