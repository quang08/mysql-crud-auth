const express = require("express");
const { postValidator } = require("../validators/postValidator");
const { getPost, updatePost } = require("../controllers/postControllers");
const router = new express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, content, poster } = req.body;
    const validator = await postValidator(req);
    if (validator !== null) {
      return res.send({ message: validator });
    } else {
      const result = await createPost(title, content, poster);
      return res.send({
        message: "Post created successfully",
        data: result,
      });
    }
  } catch (e) {
    return res.status(500).send({ error: `Server error: ${e}` });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const result = await getPost(postId);

    if (result === null)
      return res.status(404).send({ message: "Post not found" });

    return res.send({ result });
  } catch (e) {
    return res.status(500).send({ error: `Server error: ${e}` });
  }
});

router.put("/:postId", async (req, res) => {
  try {
    const { postId } = req.param;

    const { title, content, poster } = req.body;

    const validator = await postValidator(req);

    if (validator !== null) {
      return res.send({ message: validator });
    }

    const result = await updatePost(postId, title, content);

    if (result === null) {
      return res.status(404).send({ message: "Post not found" });
    }
    return res.send({
      message: "Updated",
      data: result,
    });
  } catch (e) {
    return res.status(500).send({ error: `Server error: ${e}` });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).send({ error: `Server error: ${e}` });
  }
});

module.exports = router;
