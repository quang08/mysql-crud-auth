const raiseErr = async (req) => {
  const errors = await req.getValidationResult();
  if (!errors.isEmpty()) {
    let err = errors.array();
    let firstError = err.map((e) => e.msg)[0];
    return firstError;
  }
  return null;
};

const postValidator = async (req) => {
  req.check("title", "title is required.").not().isEmpty();
  req.check("content", "content is required.").not().isEmpty();
  req
    .check("content", "content must be less than 255 characters")
    .isLength({ max: 255 });
  req.check("poster", "poster is required.").not().isEmpty();
  req.check("poster", "poster must be number.").isNumeric();

  //check for errs
  return await raiseErr(req);
};

module.exports = {
  postValidator,
};
