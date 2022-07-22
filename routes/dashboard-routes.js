const router = require("express").Router();
const { response } = require("express");
const sequelize = require("../config/connection");
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

// '/dashboard'
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "content", "created_at"],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// '/dashboard/create-post
router.get("/create-post", (req, res) => {
  res.render("create-post", {
    style: "style.css",
  });
});

//dashboard/posts/id
router.get("/posts/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content"],
  }).then((dbPostData) => {
    const post = dbPostData.get({ plain: true });
    res.render("edit-post", { post });
  });
});

//dashboard/posts/:id
router.delete("/posts/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.render("dashboard", {
    style: "style.css",
  });
});
module.exports = router;
