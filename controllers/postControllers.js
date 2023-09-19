const { Post } = require("../models/posts/postModel");
const { User } = require("../models/users/userModel");

const findOneModel = async (model, id) => {
  return await model.findOne({
    attributes: { excludes: ["password", "role"] }, // retrieves the model with password and role excluded
    where: {
      id,
    },
  });
};

const createPost = async (title, content, poster) => {
  const result = await Post.findOrCreate({
    where: {
      title: title,
      content: content,
      poster: poster,
    },
  });
  return result[0];
};

const getPost = async (postId) => {
  const getPost = await findOneModel(Post, postId);

  if (getPost === null) return null;

  let getUser = null;

  if (getPost !== null) {
    getUser = await findOneModel(User, getPost.poster);
  }
  return {
    post: getPost,
    user: getUser,
  };
};

const updatePost = async (postId, title, content) => {
  const getPost = await findOneModel(Post, postId);

  if (getPost === null) return null;

  await Post.update(
    {
      title: title,
      content: content,
    },
    {
      where: {
        id: postId,
      },
    }
  );

  const updated = await getPost(postId);

  return updated;
};

const deletePost = async (postId) => {
  const getPost = await findOneModel(Post, postId);

  if (getPost === null) return null;

  await Post.destroy({
    where: {
      id: postId,
    },
  });
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
