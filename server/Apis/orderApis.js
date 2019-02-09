var express = require('express');
let DB = require('../Mongo');
const moment = require('moment-timezone');
var bcrypt = require('bcrypt-nodejs');
const Validator =require('../validation');
const jwToken=require('../Jwt')
var ObjectId = require('mongodb').ObjectID;


const orderApis = {
    createOrder:function(req, res, next) {

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
    },
    getAllOrders:function(req, res, next) {
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
    },
    viewOrder:function(req, res, next){
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
    }
};

module.exports = orderApis;