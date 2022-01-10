const router = require("express").Router();
const {Post, Comment, User} = require("../models/");
const withAuth = require("../utils/auth");


router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      userId: req.session.userId
    },

  })
    .then(dbPostData => {

      const posts = dbPostData.map(post => post.get({ plain: true }));


      res.render("homepage", {
        layout: "profile",
        posts
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      }
    
  );
});
});

module.exports = router;