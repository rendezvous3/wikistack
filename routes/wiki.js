const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

module.exports = router;

router.get('/', function(req, res){

});

router.post('/', function(req, res){
    //console.log(req.body);
    // let newPage = Page.build({
    //     title: req.body.title,
    //     content: req.body.content,
    //     status: req.body.status
    // })
    let newPage = Page.build(req.body);
    console.log(newPage);

});

router.get('/add', function(req, res){
    res.render('addpage');
});

