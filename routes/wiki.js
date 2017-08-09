const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

module.exports = router;

router.get('/', function(req, res, next){
    Page.findAll({})
        .then(function(pages){
            res.render('index', { pages: pages });
        })
        .catch(next);
});

router.post('/', function(req, res, next){
    User.findOrCreate({
        where: {
            email: req.body.authorEmail,
            name: req.body.authorName, 
        }
    }).spread(function(user, isCompleted){
        return Page.create({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status
        })
        .then(function(createdPage){
            return createdPage.setAuthor(user);
        })
        .then(function(createdPage){
            res.redirect(createdPage.route);
        })
        .catch(next);
    })
});

router.get('/add', function(req, res){
    res.render('addpage');
});


// Note that ordering of routes is really important, if this one was above add, it
// would be problematic
router.get('/:urlTitle', function(req, res, next){
    let urlTitleOfAPage = req.params.urlTitle;

    // note find is different then find One
    // promise returns an array of pages, with find
    Page.findOne({
        where: {
            urlTitle: urlTitleOfAPage,
        }
    })
        .then(function(page){
            //console.log(page);
            if(page === null) {
                return next(new Error('That page was not found!'));
            }

            res.render('wikipage', {
                page: page,
            }); 
        })
        .catch(next);
})

