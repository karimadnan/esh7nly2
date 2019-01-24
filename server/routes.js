var express = require('express');
let DB = require('../server/Mongo');
const moment = require('moment-timezone');
var bcrypt = require('bcrypt-nodejs');
const Validator =require('../server/validation');
const jwToken=require('./Jwt')
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });
    
router.post('/login',async function(req, res, next) {
//  console.log(req.body,"thebody");
if(!req.body.Phone || !req.body.Password){
return res.status(400).send({ message: 'Missing fields'});
      }
     const collection = DB.dbo.collection('users');
      var doc = await collection.findOne({ Phone: req.body.Phone }).catch(err =>{
            console.log("Error At Login ")
            console.log("Error =>",err)
            res.status(500).send({ message: 'server error'});  
            return err;
         });
      if(!doc){
      return res.status(404).send({ message: 'Wrong Phone'});
      }
      console.log("Found the following records");
      if(doc.Password == req.body.Password){
           var payload={
            userId:doc._id,
            name:doc.name,
            access:doc.Access    
            }
            const accessToken = jwToken.issueShortLivingToken(payload);
            const response = {};
            response._token = accessToken;
            response.Access=doc.Access;
            response.Name=doc.Name;
            return res.status(200).send({ message: 'success',data:response});
      // return res.status(200).send({ message: 'User found',data:docs});
      }
      else {
      return res.status(400).send({ message: 'Wrong password'});
      }

});
    
    router.post('/createOrder', function(req, res, next) {
      //  console.log(req.body,"thebody");
         var body =req.body;
         Validator.check(body,'NewOrder').then((success)=>{ 
          const collection = DB.dbo.collection('orders');
          body.user= new ObjectId(body.user);
          body.createdAt=Date.now();
          body['status']="pending";
         collection.insertOne(body,(err,result)=>{
          if(err){
            console.log('createOrder Error =>',err)
            return res.status(500).send(err);
          }
          return res.status(200).send({ message: 'Order Created',data:[]});
        });
        },err=>{
          console.log('NewOrder validation',err)
          return res.status(400).send(err);
        })  
      });
      router.get('/getAllOrders', function(req, res, next) {
           const collection = DB.dbo.collection('orders');
           collection.aggregate([
            {
              $lookup:
                {
                  from: "users",
                  localField: "user",
                  foreignField: "_id",
                  as: "user"
                }
           },
           { $unwind:"$user" }
           ]).toArray(function(err, docs) {
            if(err){
            return res.status(500).send({ message: 'DB Error',error:err});
              }
              if(!docs[0]){
              return res.status(202).send({ message: 'No Data',date:[]});
              }
            return res.status(200).send({ message: 'all orders',data:docs});
          });  
        });
    
        router.get('/getOrderForuser', function(req, res, next) {
          const collection = DB.dbo.collection('orders');
          collection.find({user:new ObjectId(req.query.userId)}).toArray(function(err, docs) {
            if(err){
            return res.status(500).send({ message: 'DB Error',error:err});
              }
              if(!docs[0]){
              return res.status(202).send({ message: 'No Data',data:[]});
              }
            return res.status(200).send({ message: 'Orders found',data:docs});
          }); 
       });
    
       router.get('/getGame', function(req, res, next) {
        const collection = DB.dbo.collection('games');
        collection.find({Name:req.query.Name}).toArray(function(err, docs) {
          if(err){
          return res.status(500).send({ message: 'DB Error',error:err});
            }
            if(!docs[0]){
            return res.status(202).send({ message: 'No Data',data:[]});
            }
          return res.status(200).send({ message: 'Game found',data:docs});
        }); 
     });
// router.post('/userlogin',async function(req, res, next) {
//       var body=req.body;
//       if(!body.phoneNumber || !body.password){  
//          return res.status(400).send({ message: 'Missing Fields'});
//       }
//       const collection = DB.dbo.collection('apkUsers');
//       var User = await collection.findOne({ phoneNumber: body.phoneNumber }).catch(err =>{
//       console.log("error finding User")
//       console.log("Error =>",err)
//       return res.status(500).send({ message: 'DB Error',error:err});
//       })
//       if(!User)
//       {
//       return res.status(400).send({ message: 'Wrong Phone'});  
//       }
//       else if(User.status !="active"){
//       return res.status(400).send({ message: 'banned User'});  
//       }
//       else{
//       bcrypt.compare(body.password, User.password,async function (err, match) {	
//             if (err) return res.status(500).send({ message: 'Failed to Login'}); 
//             if(!match) return res.status(400).send({ message: 'Wrong password'});
//             var payload={
//                   userId:User._id,
//                   name:User.name,
//                   type:"apkUser",    
//             }
//             const accessToken = jwToken.issueShortLivingToken(payload);
//             const response = {};
//             response.access_token = accessToken;
//             response.name=User.name;
//             return res.status(200).send({ message: 'success',data:response});	
          
//       })
//       }
// })
module.exports = router;
