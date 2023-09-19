const express = require("express");
const router = new express.Router();

const {
  register,
  isLoggedIn,
  signIn,
} = require("../controllers/userControllers");
const {
  registerValidator,
  loginValidator,
} = require("../validators/userValidator");

router.post("/users", async (req, res, next) => {
  try {
    const validator = await registerValidator(req);
    if (validator !== null) {
      return res.send({ message: validator });
    } else {
      let registered = await register(req.body);
      if (registered === true) {
        return res.status(201).send({ message: "Register successfully." });
      } else {
        return res.status(500).send({ message: "Email has been used" });
      }
    }
  } catch (e) {
    return res.status(500).send({ error: `Server error: ${e}` });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const isLogged = await isLoggedIn(req);
    if (isLogged === true) {
      return res.send({ message: "You are logged in" });
    } else {
      const validator = await loginValidator(req);
      if (validator !== null) {
        return res.send({ message: validator });
      }
      const signedIn = await signIn(req);

      if (signedIn === false) {
        return res.send({ message: "Email or Password is incorrect" });
      }
      return res.send({ message: "Sign In successfully." });
    }
  } catch (e) {
    return res.status(500).send({ error: `Server error: ${e}` });
  }
});

module.exports = router;
