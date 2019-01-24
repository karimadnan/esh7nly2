var express = require('express');
let DB = require('../server/Mongo');
const moment = require('moment-timezone');
var bcrypt = require('bcrypt-nodejs');
const jwToken=require('./Jwt')
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

/* GET home page. */

router.get('/geturls', function(req, res, next) {
      // const collection = DB.dbo.collection('urlApks');
      // collection.find({}).toArray(function(err, docs) {
      //   if(err){
      //   return res.status(500).send({ message: 'DB Error',error:err});
      //     }
      //     if(!docs[0]){
      //     return res.status(202).send({ message: 'No Data',data:[]});
      //     }
      //   return res.status(200).send({ message: 'urls found',data:docs});
      // }); 
      return res.status(200).send({ message: 'Game found',data:[{"url":"url 1"}]});
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
