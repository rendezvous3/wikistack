const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

module.exports = router;

router.get('/', function(req, res){
    res.render('index');
});

router.post('/', function(req, res, next){
    let newPage = Page.build(req.body);
    newPage.save()
        .then(function(){
            console.log('Page was saved successfully!');
            res.redirect('/wiki');
        })
        .catch(function(err){
            next(err);
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
            console.log(page);
        })
        .catch(next);
        // .catch(function(err){
        //     next(err);
        // });
})

