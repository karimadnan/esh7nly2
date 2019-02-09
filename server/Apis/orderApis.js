let DB = require('../Mongo');
const Validator =require('../validation');
var ObjectId = require('mongodb').ObjectID;


const orderApis = {
    createOrder:function(req, res, next) {
        var body =req.body;
        Validator.check(body,'NewOrder').then((success)=>{ 
        const collection = DB.dbo.collection('orders');
        body.user= new ObjectId(req.token.userId);
        body.createdAt=Date.now();
        body['status']="pending";
        collection.insertOne(body,(err,result)=>{
        if(err){
            console.log('createOrder Error =>',err)
            return res.status(500).send({ message: 'Data Is Wrong'});
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
    getAllOrdersHistory:function(req, res, next) {
        const collection = DB.dbo.collection('ordersHistory');
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
        collection.updateOne({_id:new ObjectId(body.orderID)}, {$set:{"status":"InProgress"}}, function(err, result) {
          if (err) {
           console.log("failed To update ordet")
           console.log("Error =>",err)
           return res.status(500).send({message:"Update Failed"})
          }
           return res.status(200).send({message:"Orders is In Progress"});
        });
    },
    endOrder:async function(req, res, next){
    var body= req.body;
    if(!body.orderID){
    return res.status(400).send({message:'Missing fields'})
    }
    const collection = DB.dbo.collection('orders');
    const collection2 = DB.dbo.collection('ordersHistory');
    var doc = await collection.findOne({ _id: new ObjectId(body.orderID) }).catch(err =>{   
        return  res.status(500).send({ message: 'server error 001'}); 
        });
    if(!doc){
    return res.status(404).send({ message: 'Wrong orderID'});
    }
    doc['endedAt']=Date.now();
    doc['endedBy']=new ObjectId(req.token.userId);
    delete doc._id;
    delete doc.status;
    var rom = await collection.remove({ _id: new ObjectId(body.orderID)}).catch(err =>{   
        return  res.status(500).send({ message: 'server error 002'}); 
    });;
    collection2.insertOne(doc,(err,result)=>{
        if(err){
            console.log('endOrder Error =>',err)
            return res.status(500).send({ message: 'server error'});
        }
        return res.status(200).send({ message: 'Order Ended',data:[]});
    });
    },
    getOrderForuser:function(req, res, next) {
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
    }
};

module.exports = orderApis;