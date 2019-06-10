const express = require('express');
const Validator =require('../validation');
const router = express.Router();
const orderApis = require('../Apis/orderApis');
const loginApis = require('../Apis/loginApis');
const gameApis = require('../Apis/gameApis');
const extraApis = require('../Apis/extraApis');
const multer  = require('multer');
const upload = multer();
/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});    
// extra APIS ------------------------------------------------
router.post('/fetchShop', extraApis.fetchShop);
router.post('/setUserCart',Validator.checkJWT,extraApis.setUserCart);
router.get('/fetchUserCart',Validator.checkJWT,extraApis.fetchUserCart);
router.get('/getProduct', extraApis.getProduct);
router.post('/testUpload', upload.single('image'), extraApis.testUpload); 
// login Apis ------------------------------------------------
router.get('/login',loginApis.login);
router.get('/validateUser',Validator.checkJWT,loginApis.validateUser);
router.get('/adminLogin',loginApis.adminLogin);
router.post('/signup',loginApis.signup); 
router.get('/checkToken',loginApis.checkToken); 
// User APIS---------------------------------------------------
router.post('/getUserbyId',Validator.checkJWT,loginApis.getUserbyId);
router.get('/getUserAddress',Validator.checkJWT,loginApis.getUserAddress);
router.post('/setUserAddress',Validator.checkJWT,loginApis.setUserAddress);
router.post('/setUserPhoto',Validator.checkJWT,loginApis.setUserPhoto);
router.post('/getAdminbyId',Validator.checkJWT,Validator.isAdmin, loginApis.getAdminbyId);
router.get('/getOrdersCount',Validator.checkJWT,loginApis.getOrdersCount);
// order Apis-------------------------------------------------- 
router.get('/getOrdersByType',Validator.checkJWT,Validator.isAdmin,orderApis.getOrdersByType);// Not Tested
router.get('/getAdminOrders',Validator.checkJWT,Validator.isAdmin,orderApis.getAdminOrders);
router.get('/getAdminHistory',Validator.checkJWT,Validator.isAdmin,orderApis.getAdminHistory);// Not Tested
router.get('/assginlead',Validator.checkJWT,Validator.isAdmin,orderApis.assginlead);
router.get('/getUserOrders',Validator.checkJWT,Validator.isAdmin,orderApis.getUserOrders);
router.get('/getUserHistory',Validator.checkJWT,orderApis.getUserHistory);
router.get('/getAllOrders',Validator.checkJWT,Validator.isAdmin,orderApis.getAllOrders);
router.get('/getAllOrdersHistory',Validator.checkJWT,Validator.isAdmin,orderApis.getAllOrdersHistory);
router.get('/getOrderForuser',Validator.checkJWT,orderApis.getOrderForuser);
router.post('/createOrder',Validator.checkJWT, orderApis.createOrder);
router.post('/viewOrder',Validator.checkJWT,Validator.isAdmin,orderApis.viewOrder);
router.post('/endOrder',Validator.checkJWT,Validator.isAdmin,orderApis.endOrder);
router.post('/updateComment',Validator.checkJWT,Validator.isAdmin,orderApis.updateComment);
// game Apis-------------------------------------------------    
router.get('/getGame',gameApis.getGame);
    

module.exports = router;
