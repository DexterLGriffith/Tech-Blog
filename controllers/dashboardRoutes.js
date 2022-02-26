const router = require("express").Router();

const { Post, Comment, User } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      userId: req.session.userId,
    },
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        include: [
          {
            model: User,

            attributes: ["username"],
          },
        ],
      },
    ],
  }).then((dbPostData) => {
    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res
      .render("/dashboard", {
        
        posts,
        
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
});

//edit post
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
    ],
  })
    .then((dbPostData) => {
      const post = dbPostData.get({ plain: true });
      res.render("edit", {
        post,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      
    });
});

module.exports = router;
