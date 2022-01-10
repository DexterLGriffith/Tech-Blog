const router = require('express').Router();
const { Post, User, Comment } = require('../models');
let withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

    res.render('login');
});
router.get('/signup', async (req, res) => {

    res.render('signup');
});
router.get("/", (req, res) => {
    Post.findAll({
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"]
            }
          ]
        },
        {
          model: User,
          attributes: ["username"]
        }
      ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
  

        res.render("homepage", {
          layout: "main",
          posts
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  router.get("/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"]
            }
          ]
        },
        {
          model: User,
          attributes: ["username"]
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }

        const post = dbPostData.get({ plain: true });
  
        res.render("post-page", {
          layout: "main",
          post
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get("/signup", (req, res) => {
    res.render("signup", {
      layout: "main"
    });
  });
  
  router.get("/login", (req, res) => {
    res.render("login", {
      layout: "main"
    });
  });
