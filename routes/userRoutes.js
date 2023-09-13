const userControllers = require("../controllers/userControllers");

const express = require("express");
const router = new express.Router();

const { register } = require("../controllers/userControllers");
const { registerValidator } = require("../validators/userValidator");

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

module.exports = router;
