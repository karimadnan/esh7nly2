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
router.get('/payment', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/fortniteshop', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/signup', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/market', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/admindashboard', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/privacy', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/contactus', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/login', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/checkout', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/account', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
router.get('/productpage', function(req, res, next) {
    return res.sendFile(path.resolve(Front, 'index.html'))
}); 
module.exports = router;