const router = require('express').Router();
const {Comment, User, Post} = require('../models');

//comment routes
router.get('/', (req, res) => {
    Comment.findAll({
        include: [
        {
            model: User,
            attributes: ["username"]
        },
        {
            model: Post,
            attributes: ["title"]
        }
        ]
    })
        .then(dbCommentData => {
        // serialize data
        const comments = dbCommentData.map(comment => comment.get({ plain: true }));
    
        // render homepage
        res.render('homepage', {
            layout: 'main',
            comments
        });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    }
);


//find one comment by id and user
router.get("/:id", (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        include: [
        {
            model: User,
            attributes: ["username"]
        },
        {
            model: Post,
            attributes: ["title"]
        }
        ]
    })
        .then(dbCommentData => {
        // serialize data
        const comments = dbCommentData.get({ plain: true });
    
        // render homepage
        res.render('homepage', {
            layout: 'main',
            comments
        });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    }
);


module.exports = router;