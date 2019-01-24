var express = require('express');
const path = require('path');
const Front = './build';
var router = express.Router();


router.get('/', function(req, res, next) {
    return res.sendFile(path.resolve(Front,'index.html'))
}); 
router.get('/main', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/games', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/payment', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/fortniteshop', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/signup', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
module.exports = router;