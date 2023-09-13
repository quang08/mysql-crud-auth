const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();

const sequelize = new Sequelize(
  process.env.MY_SQL_DB,
  process.env.MY_SQL_USER,
  process.env.MY_SQL_PASSWORD,
  {
    host: process.env.MY_SQL_HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;

