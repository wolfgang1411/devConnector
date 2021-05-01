const express = require("express");
const auth = require("../../middlewares/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const User = require("../../models/User");
const router = express.Router();

// upload a post

router.post(
  "/",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.message);
      return res.json({ msg: error.array() });
    }
    try {
      const completeUser = await User.findById(req.user).select("-password");
      const avatar = completeUser.avatar;
      const name = completeUser.name
      const user = req.user;
      const { ...others } = req.body;
      const data = { user, avatar, name , ...others };
      const post = new Post(data);
      await post.save();
      return res.json(post);
    } catch (err) {
      
      return res.status(401).json({ msg: "SErver Error" });
    }
  }
);

router.get("/", auth, async (req, res) => { 
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json(posts);
  } catch (err) {
    return res.status(400).json({ msg: "Server Error" });
  }
});

// find post by id

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({msg:"server error"});
  }
});

// delete post by id

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.user)
      return res.status(405).json({ msg: "Not Authorized" });

    await post.delete();

    res.send("Post Deleted Successfully");
  } catch (err) {
    console.error(err.message);
    res.status(401).json({msg:'Server ERror'})
  }
});

// add like to a post
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user });

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "Server ErroR" });
  }
});

// unlike from post

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post han'nt been liked" });
    }

    const deleteIndex = post.likes.map((like) => like.user).indexOf(req.user);

    post.likes.splice(deleteIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "Server ErroR" });
  }
});

// add Comment to post

router.post(
  "/comments/:id",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => { 
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.message);
      return res.json({ msg: error.array() });
    }
    try {
      const completeUser = await User.findById(req.user).select("-password");
      console.log(req.params.id)
      const post = await Post.findById(req.params.id);
      
      const avatar = completeUser.avatar;
      const name = completeUser.name
      const user = req.user;
      const { ...others } = req.body;
      const data = { user, avatar, name , ...others };
      post.comments.unshift(data);
      await post.save();
      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "SErver Error" });
    }
  }
);

router.delete("/comments/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: "Commnet not Found" });
    }

    const deleteIndex = post.comments
      .map((comment) => comment._id.toString())
      .indexOf(req.params.comment_id);

    if (comment.user.toString() !== req.user) {
      return res.status(401).json({ msg: "Authorization denied" });
    }
    post.comments.splice(deleteIndex, 1);
    await post.save();
    return res.status(200).json(post.comments);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ msg: "server ERROR" });
  }
});

module.exports = router;
