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
const extraApis = require('../Apis/extraApis');
/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});    
// login Apis ------------------------------------------------
router.get('/login',loginApis.login);
router.get('/validateUser',Validator.checkJWT,loginApis.validateUser);
router.get('/adminLogin',loginApis.adminLogin);
router.post('/signup',loginApis.signup); 
// router.post('/sendEmail',extraApis.sendEmail); 
router.get('/checkToken',loginApis.checkToken); 
// User APIS---------------------------------------------------
router.post('/getUserbyId',Validator.checkJWT,loginApis.getUserbyId);
router.post('/getAdminbyId',Validator.checkJWT,Validator.isAdmin, loginApis.getAdminbyId);
router.get('/getOrdersCount',Validator.checkJWT,loginApis.getOrdersCount);
// order Apis-------------------------------------------------- 
router.get('/getOrdersByType',Validator.checkJWT,Validator.isAdmin,orderApis.getOrdersByType);// Not Tested
router.get('/getAdminOrders',Validator.checkJWT,Validator.isAdmin,orderApis.getAdminOrders);// Not Tested
router.get('/getAdminHistory',Validator.checkJWT,Validator.isAdmin,orderApis.getAdminHistory);// Not Tested
router.get('/assginlead',Validator.checkJWT,Validator.isAdmin,orderApis.assginlead);// Not Tested
router.get('/getUserOrders',Validator.checkJWT,Validator.isAdmin,orderApis.getUserOrders);// Not Tested
router.get('/getUserHistory',Validator.checkJWT,Validator.isAdmin,orderApis.getUserHistory);// Not Tested
router.get('/getAllOrders',Validator.checkJWT,Validator.isAdmin,orderApis.getAllOrders);
router.get('/getAllOrdersHistory',Validator.checkJWT,Validator.isAdmin,orderApis.getAllOrdersHistory);
router.get('/getOrderForuser',Validator.checkJWT,orderApis.getOrderForuser);
router.post('/createOrder',Validator.checkJWT, orderApis.createOrder);// Not Tested
router.post('/viewOrder',Validator.checkJWT,Validator.isAdmin,orderApis.viewOrder);// Not Tested
router.post('/endOrder',Validator.checkJWT,Validator.isAdmin,orderApis.endOrder);   // Not Tested
// game Apis-------------------------------------------------    
router.get('/getGame',gameApis.getGame);
    

module.exports = router;
