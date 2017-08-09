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
            status: req.body.status,
            tags: req.body.tags
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


router.get('/search/:tag', function(req, res, next){
    Page.findByTag(req.params.tag)
    .then(function(pages){
        res.render('index', {
            pages: pages,
        })
    })
    .catch(next);
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

        // Page.belongsTo(User, { as: 'author' });
        page.getAuthor()
        .then(function(author){
            page.author = author;
            res.render('wikipage', {
                page: page,
                //author: author
            });
        });

 
    })
    .catch(next);
})

router.get('/:urlTitle/similar', function(req, res, next){
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    .then(function(page){
        if(page === null) {
            return next(new Error('That Page was not found!'));
        }
        //var pages = page.findSimilar();
        //return [pages, page];
        // res.render('index', { pages: pages,
        //                       title: 'Similar pages',
        //                       pageN: page });
        //res.render('index', {pages:pages});  
        return page.findSimilar();                      
    })
    .then(function(similarPages){
        res.render('index', {pages: similarPages})
    })
    // .then(function(pages){
    //     res.render('index', { pages: pages[0], title: 'Similar pages', pageN: pages[1] });
    // })
    .catch(next);
});

