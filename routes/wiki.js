const express = require('express');
const router = express.Router();
module.exports = router;

router.get('/', function(req, res){

});

router.post('/', function(req, res){
    console.log(req.body);

});

router.get('/add', function(req, res){
    res.render('addpage');
});

