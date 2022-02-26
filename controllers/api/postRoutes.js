const router = require('express').Router();
const { Post } = require('../../models/');
//import auth
const withAuth = require('../../utils/auth');

//Add new post
router.post("/", withAuth, (req, res) => {
    Post.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.session.userId
    })
      .then(dbPostData => {
        res.json(dbPostData);
          
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //update post 
    router.put("/:id", withAuth, (req, res) => {
        Post.update(
            {
                title: req.body.title,
                body: req.body.body
            },
            {
                where: {
                    id: req.params.id
                }
            }

        ).then(dbPostData=>{
            res.json(dbPostData);
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json(err);
        }   )
    })
    
  module.exports = router;