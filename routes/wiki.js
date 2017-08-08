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
    console.log(req.body);
    // let newPage = Page.build(req.body);
    // newPage.save()
    //     .then(function(savedPage){
    //         console.log('Page was saved successfully!');
    //         // weird JS magic getter method is invoked without ()
    //         res.redirect(savedPage.route);
    //     })
    //     .catch(next);

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

