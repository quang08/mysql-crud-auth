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

const signIn = async (req) => {
  let user = await findUser(req.body);
  if (user === null) {
    return false;
  } 
  try {
    const passwordMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(req.body.password, user.password, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(res);
      });
    });

    if (passwordMatch) {
      req.session.user = user;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const isLoggedIn = async (req) => {
  if (req.session && req.session.user) {
    return true;
  } else {
    return false;
  }
};

module.exports = { register, signIn, isLoggedIn };
