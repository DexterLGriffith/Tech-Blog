const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

//find all posts for homepage
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "id"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username", "id"],
            },
          ],
        },
      ],
    });
    const postedPost = posts.map((post) => post.get({plain: true}));
    
    res.render('profile', {
      postedPost,
      loggedIn: req.session.loggedIn
    });
    // .then((dbPostData) => {
    //   const posts = dbPostData.map((post) => post.get({ plain: true }));
    //   res.render("homepage", {
    //     posts,
    //   });
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// dashboard route


router.get("/dashboard", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/login");
    return;
  }
  res.render("dashboard");
});

//find single post by id
router.get("/post/:id", async (req, res) => {
  try {
    const posts = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username", "id"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username", "id"],
            },
          ],
        },
      ],
    }).then((posts) => {
      const post = posts.get({ plain: true });
      res.render("post", {
        post,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//signup route
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
