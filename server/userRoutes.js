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
module.exports = router;