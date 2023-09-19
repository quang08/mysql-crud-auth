// src/posts/postModel.js

"use strict";

const { Sequelize } = require("sequelize");
const sequelize = require("../../config/database");

// table [extension]
let Post = sequelize.define(
  "posts",
  {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    poster: Sequelize.INTEGER,
  },
  {
    tableName: "posts",
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

module.exports = {
  Post,
};
