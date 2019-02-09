var express = require('express');
let DB = require('../Mongo');
const moment = require('moment-timezone');
var bcrypt = require('bcrypt-nodejs');
const Validator =require('../validation');
const jwToken=require('../Jwt')
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();
const orderApis = require('../Apis/orderApis');
const loginApis = require('../Apis/loginApis');
const gameApis = require('../Apis/gameApis');
/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});   
// login Apis ------------------------------------------------
router.post('/login',loginApis.login);
router.post('/signup',loginApis.signup); 
router.get('/checkToken',loginApis.checkToken); 
router.post('/getUserbyId',Validator.checkJWT,Validator.isAdmin,loginApis.getUserbyId);
// order Apis-------------------------------------------------- 
router.get('/getAllOrders',Validator.checkJWT,Validator.isAdmin,orderApis.getAllOrders);
router.get('/getAllOrdersHistory',Validator.checkJWT,Validator.isAdmin,orderApis.getAllOrdersHistory);
router.get('/getOrderForuser',Validator.checkJWT,orderApis.getOrderForuser);
router.post('/createOrder',Validator.checkJWT, orderApis.createOrder);
router.post('/viewOrder',Validator.checkJWT,Validator.isAdmin,orderApis.viewOrder);
router.post('/endOrder',Validator.checkJWT,Validator.isAdmin,orderApis.endOrder);   
// game Apis-------------------------------------------------    
router.get('/getGame',gameApis.getGame);
    

module.exports = router;
