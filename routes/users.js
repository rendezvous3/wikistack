const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
const Promise = require('bluebird');

module.exports = router;

router.get('/', function(req, res, next){
    User.findAll({})
    .then(function(users){
        res.render('users', { users: users});
    })
    .catch(next)
    
})

router.get('/:userId', function(req, res, next){
    //User.findById(req.params.userId)
    // User.findOne({ 
    //     where: {
    //         id: req.params.userId
    //     }
    //  })
    //  .then(function(user){
    //     if (user === null) {
    //         return new Error('That User was not found!');
    //     }
    //     let pages;
    //     Page.findAll({
    //          where: { authorId: user.id } 
    //     }).then(function(pages){
    //         res.render('userPage', { user: user, pages: pages });
    //     })
    //  })
    //  .catch(next);
    let pages;
    let user;
    let findingPages = Page.findAll({ 
        where: {
            authorId: req.params.userId
        } 
    });

    let findingUser = User.findById(req.params.userId);

    Promise.all([ findingPages, findingUser ])
    .then(function(values){
        pages = values[0];
        user = values[1];

        res.render('userPage', { user: user, pages: pages });
    })
    .catch(next);
})