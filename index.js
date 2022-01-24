const express = require("express");
const app = express();

require("./setup/startup")(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
