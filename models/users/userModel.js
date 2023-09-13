"use strict";

const { Sequelize } = require("sequelize");
const sequelize = require("../../config/database");

let User = sequelize.define(
  "users",
  {
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    role: {
      type: Sequelize.ENUM("admin", "customer"),
    },
  },
  {
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
    charset: "utf8",
    collate: "utf8_unicode_ci",
  }
);

module.exports = { User };
