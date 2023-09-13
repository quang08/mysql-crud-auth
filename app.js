const express = require("express");
const sequelize = require("./config/database");

const app = express();
const PORT = 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to MySQL database has been established successfully."
    );
    app.listen(PORT, () => {
      console.log("Server started on localhost:" + PORT);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.use((e, req, res, next) => {
  console.log(e.stack);
  res.status(500).send("Something broke");
});
