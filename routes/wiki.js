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

