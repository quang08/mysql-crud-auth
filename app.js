const express = require("express");
const sequelize = require("./config/database");
const dotenv = require("dotenv");
const session = require("express-session");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const MySQLStore = require("express-mysql-session")(session);

dotenv.config();
const app = express();
const PORT = 3000;

const options = {
  host: process.env.MY_SQL_HOST,
  port: PORT,
  user: process.env.MY_SQL_USER,
  password: process.env.MY_SQL_PASSWORD,
  database: process.env.MY_SQL_DB,
};
const sessionStore = new MySQLStore(options);

app.use(
  session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));

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
