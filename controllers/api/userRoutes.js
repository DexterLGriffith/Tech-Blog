const router = require("express").Router();
const { User } = require("../models/");

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((userData) => {
      re.session.save(() => {
        req.session.userId = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
        res.json(userData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

});
  router.get("/login", (req, res) => {
    User.findOne({
      where: {
        id: req.session.userId,
      },
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        const user = dbUserData.get({ plain: true });
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  router.post('/signup', async (req, res) => {
    try {
        const userSignUpData = await User.create(req.body)
        req.session.save(() => {
            req.session.userid = userSignUpData.id
            req.session.loggedIn = true
            res.status(200).json(userSignUpData)
        })
    }
    catch(err) {
        res.status(400).json(err)
    }
    res.render('/login'); 
});
router.post('/logout', (req, res) => {
  if (req.session.loggedIn === true) {
      req.session.destroy();
  }
  else {
      res.status(404).end();
  }
  res.status(200).render('/');
});
module.exports = router;