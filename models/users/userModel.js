"use strict";

const { Sequelize } = require("sequelize");
const sequelize = require("../../config/database");
const { Post } = require("../posts/postModel");

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

//Relationship
User.hasMany(Post, {
  as: "posts", //an alias for the association. Can use user.posts to get all the posts associated with a user.
  foreignKey: "poster", //This means that the Post model will have a column named poster that references the User model.
});

module.exports = { User };
