const router = require("express").Router();
const { User, Post, Comment } = require("../../models/");

//find all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: ["id", "username"],
  }).then((dbUserData) => {
    res.json(dbUserData);
  });
});

//FIND ONE USER
router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "username"],
    include: [
      {
        model: Post,
        attributes: ["id", "title", "body"],
        include: [
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
      },
    ],
  }).then((dbUserData) => {
    res.json(dbUserData);
  });
});

//CREATE NEW USER
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.userId = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


//login user
router.post("/login", (req,res)=>{
  User.findOne({
    where: {
      username:req.body.username
    }
}).then(async dbUserData =>{
  if(!dbUserData) {
    res.status(400).json({message: "Could not find user with that username"});
    return;
  }
  const validPassword = await dbUserData.checkPassword(req.body.password);
  if(!validPassword) {
    res.status(400).json({message: "Incorrect password"});
    return;
  }
  req.session.save(()=>{
    req.session.userId = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    res.json(dbUserData);
  })
})
});

//logout user 
router.post("/logout", (req,res)=>{
  if(req.session.loggedIn) {
    req.session.destroy(()=>{
      res.status(204).end();
    })
  } else {
    res.status(404).end();
  }
});

module.exports = router;
