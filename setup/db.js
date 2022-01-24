const mongoose = require("mongoose");
const config = require("config");

module.exports = () => {
  mongoose
    .connect(config.get("DB_URL"), {
      useNewUrlParser: true,
    })
    .then(() => console.log("mongodb connected ..."))
    .catch((err) => console.log("mongodb disconnected", err.message));
};
