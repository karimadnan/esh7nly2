const DB = require('../Mongo');
const bcrypt = require('bcrypt-nodejs');
const Validator =require('../validation');
const jwToken=require('../Jwt');
const ObjectId = require('mongodb').ObjectID;
const nodemailer = require("nodemailer");
const axios = require("axios");

let transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.V_E,
        pass: process.env.V_E_P
    }
});

const loginApis = {

login:async function(req, res) {
//  console.log(req.body,"thebody");
if(!req.query.Phone || !req.query.Password){
return res.status(400).send({ message: 'Missing fields'});
        }
        const collection = DB.dbo.collection('users');
        var doc = await collection.findOne({ Phone: req.query.Phone }).catch(err =>{
            console.log("Error At Login ")
            console.log("Error =>",err)
            res.status(500).send({ message: 'server error'});  
            return err;
            });
        if(!doc){
        return res.status(404).send({ message: 'Wrong Phone'});
        }
        console.log("Found the following records");
        bcrypt.compare(req.query.Password, doc.Password,function (err, match) {	
        if (err)  return res.status(500).send({ message: 'failed password'});
        if(!match)  return res.status(400).send({ message: 'Wrong password'});
            var payload={
            userId:doc._id,
            name:doc.Name,
            photo:doc.Photo,
            access:doc.Access    
            }
            const accessToken = jwToken.issueShortLivingToken(payload);
            const response = {};
            response._token = accessToken;
            response.Access=doc.Access;
            response.status=doc.status;
            response.Photo=doc.Photo;
            response.Name=doc.Name;
            return res.status(200).send({ message: 'success',data:response});

            })

},
adminLogin:async function(req, res){
let body = req.query;
if(!body.Password || !body.Email.includes('@ggegypt.com')){
    return res.status(400).send({ message: 'Missing fields'});
}
const collection = DB.dbo.collection('admins');
var doc = await collection.findOne({ Email: body.Email }).catch(err =>{
    console.log("Error At Login ")
    console.log("Error =>",err)
    res.status(500).send({ message: 'server error'});  
    return err;
    });
if(!doc){
return res.status(404).send({ message: 'Email does not match'});
}
console.log("Found the following records");
bcrypt.compare(body.Password, doc.Password,function (err, match) {	
if (err)  return res.status(500).send({ message: 'failed password'});
if(!match)  return res.status(400).send({ message: 'Wrong password'});
    var payload={
    userId:doc._id,
    name:doc.Name,
    access:doc.Access,
    isAdmin:true    
    }
    const accessToken = jwToken.issueShortLivingToken(payload);
    const response = {};
    response._token = accessToken;
    response.Access=doc.Access;
    response.isAdmin=true;
    response.Name=doc.Name;
    return res.status(200).send({ message: 'success',data:response});

    })
},
signup:function(req, res, next) {
var body =req.body;
Validator.check(body,'signup').then(success=>{ 
    axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GREC}&response=${body.Captcha}`)
    .then(success=>{
        const collection = DB.dbo.collection('users');
        body.createdAt=Date.now();
        body['status']="pending";
        body.Access=1;
        body.VouchPoints=0;
        body.health=3;
        body.Photo="";
        body.verifyEmail=Math.floor((Math.random() * 1000000) + 1);
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
            let mailOptions = {
                from: 'contact@ggegypt.com', // sender address
                to: `${body.Email}`, // list of receivers
                subject: "GG-Egypt Complete Registration", // Subject line
                text: `Welcome to GG-Egypt: ${body.Name}.`, // plain text body
                // HTML body
                html: `<h2> ${body.Name}</h2> <p><b>Welcome to GG-Egypt</b></p>
                <p>Your verification code is:<br/><h1>${body.verifyEmail}</h1></p>
                <p>If it wasn't you just ignore this email.</p>
                <p>-----------------------------------------------</p>
                <h2> ${body.Name}</h2> <p><b> GG-Egypt اهلا بك فى </b></p>
                <p> :كود التفعيل الخاص بك هو <br/><h1>${body.verifyEmail}</h1></p>
                <p> اذا لم تطلب هذا الكود تجاهل الأيميل </p>`,
            };
    
            // send mail with defined transport object
            transporter.sendMail(mailOptions).then(success => {
                return res.status(200).send({ message: 'User Created and email sent'});
            },err=>{
                return res.status(200).send({ message: 'User Created and email failed'});
            });
      
        });
    });
    })
    .catch(err=>{
        console.log("Recaptcha failed", err)
        return res.status(400).send(err);
    });
},err=>{
    console.log('signup validation',err)
    return res.status(400).send(err);
});
},
validateUser:async function(req, res){
if(!req.query.code){
    return res.status(400).send({ message: "Code is invaild"})
}
const collection = DB.dbo.collection('users');
let user;
try{
    user = await collection.findOne({_id: new ObjectId(req.token.userId)})
}
catch(err){
    return res.status(500).send({ message: "Error"})
}
if(Number(user.verifyEmail) == Number(req.query.code)){
    collection.updateOne({_id: new ObjectId(req.token.userId)}, {$set: {status: "active"}},(err,result)=>{
        if(err){
            return res.status(500).send({ message: 'Failed to activate user.'});
        }
        return res.status(200).send({ message: 'User verified.',data:[]});
        })
}
else{
    return res.status(400).send({ message: "Invaild code"})
}
},
checkToken:function(req, res, next) {
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

},
getUserbyId:async function(req, res, next){
const collection = DB.dbo.collection('users');
var doc = await collection.findOne({ _id: new ObjectId(req.token.userId) },{fields:{_id:0, Name: 1, Phone: 1,Access:1 ,Email:1, health: 1, status: 1, VouchPoints: 1, Photo: 1}} ).catch(err =>{   
return  res.status(500).send({ message: 'server error 003'}); 
});  
return res.status(200).send({ message: 'User',doc});
},
getUserAddress:async function(req, res, next){
userId = req.query.userId;

if(!userId) userId = req.token.userId;
const collection = DB.dbo.collection('users');
let user;
try{
    user = await collection.findOne({_id: new ObjectId(userId)}, {fields: {Name: 1, ShippingData: 1}});
}
catch(err){
return res.status(500).send({ message: "Error y3m."});
}
return res.status(200).send({ message: "User Shipping Data", user});
},
setUserAddress:async function(req, res){
    Validator.check(req.body,'ShippingData').then(async ()=>{
        const collection = DB.dbo.collection('users');

        try{
            await collection.updateOne({_id: new ObjectId(req.token.userId)}, {$set: {ShippingData: req.body}});
        }
        catch(err){
            return res.status(500).send({ message: 'Error finding data'});
        }
            return res.status(200).send({ message: 'Shipping Data Updated'});

    },err => {return res.status(400).send(err);});
},
setUserPhoto:async function(req, res){
    const collection = DB.dbo.collection('users');
    try{
        await collection.updateOne({_id: new ObjectId(req.token.userId)}, {$set: {"Photo": req.body.photo}});
    }
    catch(err){
        return res.status(500).send({ message: 'Error finding data'});
    }
        return res.status(200).send({ message: 'Photo Updated'});
},
getAdminbyId:async function(req, res, next){
    let adminId=req.query.adminId;
    if(!adminId){
        adminId=req.token.userId;
    }
    const collection = DB.dbo.collection('admins');
    var doc = await collection.findOne({ _id: new ObjectId(adminId) },{fields:{_id:0, Name: 1, Phone: 1,Access:1 ,Email:1, status: 1}} ).catch(err =>{   
    return  res.status(500).send({ message: 'server error 003'}); 
    });  
    return res.status(200).send({ message: 'Admin', doc});
    },
getOrdersCount:async function(req, res){
    const collection = DB.dbo.collection('orders');
    let orders;
     try{    orders =await collection.aggregate([
            {$match: {"user": new ObjectId(req.token.userId)}},
            {$group: {_id: "$status", count:{$sum:1}}}
        ]).toArray();
    }catch(err){
        console.log(err,"error happened")
        return res.status(500).send({message:"Unexpected Error"})
    }
    
    const collection2 = DB.dbo.collection('ordersHistory');
    let history;
    try{
        history =await collection2.aggregate([
            {$match: {"user": new ObjectId(req.token.userId)}},
            {$group: {_id: "$status", count:{$sum:1}}}
        ]).toArray();
    }catch(err){
        return res.status(500).send({message:"Unexpected Error"})
    }
    return res.status(200).send({orders,history})
    }
};

module.exports = loginApis;