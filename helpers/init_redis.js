const redis = require("redis");
const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST_NAME,
  password: process.env.REDIS_PASSWORD,
  retry_strategy: function (options) {
    if (options.error) {
      if (options.error.code === "ECONNREFUSED") {
        // End reconnecting on a specific error and flush all commands with a individual error
        return new Error("The server refused the connection");
      }
      if (options.error.code === "ECONNRESET") {
        return new Error("The server reset the connection");
      }
      if (options.error.code === "ETIMEDOUT") {
        return new Error("The server timeouted the connection");
      }
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 5) {
      // End reconnecting with built in error
      return new Error("Retry attempts ended");
    }
    // reconnect after
    return 1000;
  },
});

client.on("connect", () => {
  console.log("Client connected");
});

client.on("ready", () => {
  console.log("Client connected to redis and ready to use");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Client disconnected");
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
