const redis = require("redis");
const client = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 1) {
      // End reconnecting with built in error
      return undefined;
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
