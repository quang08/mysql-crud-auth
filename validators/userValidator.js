const raiseErr = async (req) => {
  let errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    let err = errors.array();
    let firstError = err.map((e) => e.msg)[0];
    return firstError;
  }
  return null;
};

const registerValidator = async (req) => {
  req.check("email", "email is required.").not().isEmpty();
  req.check("email", "Invalid email.").isEmail();
  req.check("username", "username is required.").not().isEmpty();
  req
    .check("username", "Username must be more than 2 characters")
    .isLength({ min: 3 });
  req.check("password", "password is required.").not().isEmpty();
  req
    .check("password", "Password must be more than 6 characters")
    .isLength({ min: 6 });
  req
    .check("password_confirmation", "password_confirmation is required.")
    .not()
    .isEmpty();
  req
    .check("password_confirmation", "Password mismatch")
    .equals(req.body.password);

  //check for errors
  return await raiseErr(req);
};

const loginValidator = async (req) => {
  req.check("email", "email is required.").not().isEmpty();
  req.check("email", "Invalid email.").isEmail();
  req.check("password", "password is required.").not().isEmpty();
  req
    .check("password", "Password must be more than 6 characters")
    .isLength({ min: 6 });

  //check for errors
  return await raiseErr(req);
};

module.exports = { registerValidator, loginValidator };
