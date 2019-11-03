const DB = require('../Mongo');
const Validator =require('../validation');
const ObjectId = require('mongodb').ObjectID;
const nodemailer = require("nodemailer");

const AWS = require('aws-sdk');
let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });



const extraApis = {
    setUserCart:async function(req, res){
        Validator.check(req.body,'cart').then(async ()=>{
            const collection = DB.dbo.collection('carts');
            let cart;
            try{
                if( Array.isArray(req.body.cart) && req.body.cart.length == 0){
                    await collection.remove({userID: new ObjectId(req.token.userId)});
                }
                else{
                cart = await collection.updateOne(
                    {userID: new ObjectId(req.token.userId)}, 
                    {$set: {cart: req.body.cart, totalPrice: req.body.totalPrice, userID: new ObjectId(req.token.userId)}}, 
                    {upsert: true}
                );
                }
            }
            catch(err){
                return res.status(500).send({ message: 'Error finding cart'});
            }
                return res.status(200).send({ message: 'Cart Updated'});
    
        },err => {return res.status(400).send(err);});
    },
    fetchUserCart:async function(req, res){
        const collection = DB.dbo.collection('carts');
        let cart;
        try{
            cart = await collection.findOne(
                {userID: new ObjectId(req.token.userId)}
            );
        }
        catch(err){
            return res.status(500).send({ message: 'Error finding cart'});
        }
        if(!cart){
            return res.status(404).send({ message: 'Cart was not found'});
        }
            return res.status(200).send({ message: 'Cart Found', data: cart});

    },
    fetchShop:function(req, res){
        const collection = DB.dbo.collection('products');
        let array=[];  
        if(req.body.Name){
           array.push({$match: { 
            $or: [
           { "soldBy": new RegExp(req.body.Name, 'i')}, 
           { "category": new RegExp(req.body.Name, 'i')}, 
           { "Name": new RegExp(req.body.Name, 'i')},
           { "desc": new RegExp(req.body.Name, 'i')}
                 ]
        }})
        }
        if(req.body.category){
            array.push({$match:{"category":req.body.category}})
        }
        array.push( { $sort: { power: -1 } })
        if(req.body.date){
            array.push( { $sort: { date: -1 } })
        }
        if(req.body.price){
            array.push( { $sort: { price: req.body.price } })
        }
        if(req.body.skip){
            array.push({$skip:Number(req.body.skip)})
        }
        if(req.body.limit){
            array.push({$limit:Number(req.body.limit)})
        }
        collection.aggregate(array).toArray(function(err, docs){
            if(err){
            return res.status(500).send({ message: 'DB Error',error:err});
            }
            if(!docs[0]){
            return res.status(202).send({ message: 'No Data'});
            }
        return res.status(200).send({ message: 'payload',data:docs});
        });
    },
    testUpload:function(req, res){
     console.log(req.file,"file");
     var params = {
        Bucket: "saletproducts",
        Key: Date.now()+"_prod_"+req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: "public-read"
      };
      s3bucket.upload(params, function(err, data) {
        if (err) {
                     console.log(err ,"Error------------------")
        } else {
            console.log(data,"data")
        }})
    },
    getProduct:function(req, res, next) {
        const collection = DB.dbo.collection('products');
        collection.find({_id: new ObjectId(req.query.id)}).toArray(function(err, docs) {
            if(err){
                return res.status(500).send({ message: 'DB Error',error:err});
            }
            if(!docs[0]){
                return res.status(202).send({ message: 'No Data',data:[]});
            }
                return res.status(200).send({ message: 'Product',data:docs});
        }); 
    }

};

module.exports = extraApis;