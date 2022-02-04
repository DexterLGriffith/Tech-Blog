const router = require('express').Router();
const {Post} = require('../models/');


router.get('/', (req, res) => {
    Post.findAll({
        include: [
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
        res.render('homepage', {
            layout: 'main',
            posts
        });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    }
);


module.exports = router;