const { User } = require("../models/users/userModel");
const bcrypt = require("bcrypt");

const findUser = async (body) => {
  return await User.findOne({
    where: {
      email: body.email,
    },
  });
};

const register = async (body) => {
  console.log(body);
  let user = await findUser(body);
  if (user == null) {
    bcrypt.hash(body.password, 10, async (e, hash) => {
      if (e) return next(e);
      await User.create({
        username: body.username,
        email: body.email,
        role: "customer",
        password: hash,
      });
    });
    return true;
  } else {
    return false;
  }
};

module.exports = { register };
