const router = require("express").Router();
const req = require("express/lib/request");
const { Post, Comment, User } = require("../models/");

// get all posts for homepage
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
      // serialize data
      const posts = dbPostData.map(post => post.get({ plain: true }));

      // render homepage
      res.render("home", {
     
        posts
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//find one post by id and user
// router.get("/:id", (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id
//     },
//     include: [
//       {
//         model: Comment,
//         include: [
//           {
//             model: User,
//             attributes: ["username"]
//           }
//         ]
//       },
//       {
//         model: User,
//         attributes: ["username"]
//       }
//     ]
//   })
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: "Something" });
//         return;
//       }

//       // serialize data
//       const post = dbPostData.get({ plain: true });

//       // render post page
//       res.render("project", {
//         layout: "dashboard",
//         post
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

//render signup page
router.get("/signup", (req, res) => {
  if(req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

//render login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
})


module.exports = router;
