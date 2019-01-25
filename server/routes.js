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
      bcrypt.compare(req.body.Password, doc.Password,function (err, match) {	
        if (err)  return res.status(500).send({ message: 'failed password'});
        if(!match)  return res.status(400).send({ message: 'Wrong password'});
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

          })

});
router.post('/signup',function(req, res, next) {
  var body =req.body;
  Validator.check(body,'signup').then(success=>{ 
    const collection = DB.dbo.collection('users');
    body.createdAt=Date.now();
    body['status']="active";
    body.Access=1;
    bcrypt.hash(body.Password,null,null,function (err, hash) {
      if(err){
        console.log(err)
        return res.status(500).send(err);}

      body.Password = hash;
      collection.insertOne(body,(err,result)=>{
        if(err){
          console.log('create User Error =>',err)
          return res.status(400).send({message:'User with same data exists'});
        }

        return res.status(200).send({ message: 'User Created',data:[]});
      });
  })
  },err=>{
    console.log('signup validation',err)
    return res.status(400).send(err);
  })
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
router.post('/viewOrder',function(req, res, next){
var body= req.body;
if(!body.orderID){
return res.status(400).send({message:'Missing fields'})
}
const collection = DB.dbo.collection('orders');
collection.updateOne({_id:new ObjectId(body.orderID)}, {$set:{"status":"InProgress"}}, function(err, res) {
  if (err) {
   console.log("failed To update ordet")
   console.log("Error =>",err)
   return res.status(500).send({message:"Update Failed"})
  }
   return res.status(200).send({message:"Orders is In Progress"});
});
}) 
router.post('/endOrder',function(req, res, next){
  var body= req.body;
  if(!body.orderID){
  return res.status(400).send({message:'Missing fields'})
  }
  
})   
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

router.get('/checkToken', function(req, res, next) {
        if(!req.headers.authorization){         
      return res.status(401).send({message:'No Header'}) 
      }   
    var token =req.headers.authorization;
    jwToken.verify(token, function (err, payload) {
        if (err) {
          return res.status(401).send({ message: 'InValid auth'});
        };
        return res.status(200).send({ message: 'Valid auth'});
      });
  
});     

module.exports = router;
