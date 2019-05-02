const DB = require('../Mongo');
const Validator =require('../validation');
const ObjectId = require('mongodb').ObjectID;


const orderApis = {
    createOrder:function(req, res, next) {
        var body =req.body;
        console.log(body);
        Validator.check(body,'OrderValidation').then(async ()=>{ 
        const collection = DB.dbo.collection('orders');
        let user;
        try{
           user = await DB.dbo.collection('users').findOne({_id:new ObjectId(req.token.userId)}) 
        }catch(err){
            return res.status(500).send({message:"Unexpected Error"})
        }
        if(!user){
            return res.status(400).send({message:"Invalid User"})
        }
        else if(user.status !="active"){
            return res.status(400).send({message:"Banned users can't place orders"})      
        }
        else if(user.status =="pending"){
            return res.status(400).send({message:"Confirm your account first to start ordering"})
        }
        else{
            body.user= new ObjectId(req.token.userId);  
        }
        body.createdAt=Date.now();
        body['status']="pending";
        body.comment="Awaiting Agent";
        collection.insertOne(body,(err,result)=>{
        if(err){
            if(err.code == 11000){ return res.status(400).send({ message: 'Transaction id already exist'})}
            return res.status(500).send({ message: 'Data Is Wrong'});
        }
        return res.status(200).send({ message: 'Order Created',data:[]});
        });
        },err=>{
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
    getOrdersByType:function(req, res){
        if(!req.query.status){
            return res.status(400).send({message: "Missing Status"})
        }
        const collection = DB.dbo.collection('orders');
        collection.aggregate([
        {$match: {status: req.query.status}},
        {
        $lookup:
        {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
        }
        },
        { $unwind:"$user" },{$project: {"user.Name": 1, 
        "user.Phone": 1, 
        "user._id": 1, 
        "status": 1, 
        "createdAt": 1,
        "game": 1,
        "orderType": 1,
        "paymentMethod": 1}},
        {$sort: { createdAt: 1 }}
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
    assginlead:async function(req, res, next){
        var body= req.query;
        if(!body.orderID){
        return res.status(400).send({message:'Missing fields'})
        }
        const collection = DB.dbo.collection('orders');
        let order;
        try{
            order = await collection.findOne({_id:new ObjectId(body.orderID)}) 
        }catch(err){
            return res.status(500).send({message:"Unexpected Error"})
        }
        if(!order){
            return res.status(400).send({message:"Invalid orderID"})
        }
        else if(order.status =="onGoing"){
            return res.status(400).send({message:"this order is taken please refresh"})
        }else{
        collection.updateOne({_id:new ObjectId(body.orderID)}, {$set:{"status":"onGoing","adminId":new ObjectId(req.token.userId), "comment": "Order viewed by agent"}}, function(err, result) {
          if (err) {
           console.log("failed To update order")
           console.log("Error =>",err)
           return res.status(500).send({message:"Update Failed"})
          }
           return res.status(200).send({message:"Order is selected"});
        });
        }
    },
    getAdminOrders:function(req, res){
        let adminId=req.query.adminId;
        if(!adminId){
            adminId=req.token.userId;
        }
        const collection = DB.dbo.collection('orders');
        collection.aggregate([
        {$match: {adminId: new ObjectId(adminId)}},
        {
        $lookup:
        {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
        }
        },
        { $unwind:"$user" },{$project: {"user.Name": 1, 
        "user.Phone": 1, 
        "user._id": 1, 
        "status": 1, 
        "createdAt": 1,
        "orderType": 1,
        "cart":1,
        "transId":1,
        "paymentMethod": 1}},
        {$sort: { createdAt: 1 }}
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
    getUserOrders:function(req, res){
        let userId=req.query.userId;
        if(!userId){
            userId=req.token.userId;
        }
        const collection = DB.dbo.collection('orders');
        collection.aggregate([
        {$match: {user: new ObjectId(userId)}},
        {
        $lookup:
        {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
        }
        },
        { $unwind:"$user" },{$project: {"user.Name": 1, 
        "user.Phone": 1, 
        "user._id": 1, 
        "status": 1, 
        "createdAt": 1,
        "game": 1,
        "orderType": 1,
        "extra":1,
        "transId":1,
        "paymentMethod": 1,
        "comment": 1}},
        {$sort: { createdAt: -1 }}
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
    getAdminHistory:function(req, res){
        let adminId=req.query.adminId;
        if(!adminId){
            adminId=req.token.userId;
        }
        const collection = DB.dbo.collection('ordersHistory');
        collection.aggregate([
        {$match: {adminId: new ObjectId(adminId)}},
        {
        $lookup:
        {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
        }
        },
        { $unwind:"$user" },{$project: {"user.Name": 1, 
        "user.Phone": 1, 
        "user._id": 1, 
        "status": 1, 
        "createdAt": 1,
        "game": 1,
        "orderType": 1,
        "extra":1,
        "transId":1,
        "comment":1,
        "endedAt":1,
        "endedBy":1,
        "paymentMethod": 1}}
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
    getUserHistory:function(req, res){
        let userId=req.query.userId;
        if(!userId){
            userId=req.token.userId;
        }
        const collection = DB.dbo.collection('ordersHistory');
        collection.aggregate([
        {$match: {user: new ObjectId(userId)}},
        {
        $lookup:
        {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
        }
        },
        { $unwind:"$user" },{$project: {"user.Name": 1, 
        "user.Phone": 1, 
        "user._id": 1, 
        "status": 1, 
        "createdAt": 1,
        "game": 1,
        "orderType": 1,
        "extra":1,
        "transId":1,
        "comment":1,
        "endedAt":1,
        "endedBy":1,
        "paymentMethod": 1}}
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
        if(!body.orderID || !body.comment ){
        return res.status(400).send({message:'Missing fields'})
        }
        const collection = DB.dbo.collection('orders');
        collection.updateOne({_id:new ObjectId(body.orderID)}, {$set:{"status":"InProgress","comment":body.comment}}, function(err, result) {
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
    if(!body.orderID || !body.status){
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
    if(body.status == 1 ){
        doc['status']="Passed";
        doc['comment']="Order delivered";
    }
    else if (body.status == 2){
        doc['status']="Failed";
        doc['comment']=(body.comment)? body.comment : "Order Failed No Strikes";
    }
    else if (body.status == 3) {
        doc['status']="Failed";
        doc['comment']=(body.comment)? body.comment : "Order Failed with Strike"; 
        let user;
        try{
           user = await DB.dbo.collection('users').findOne({_id:new ObjectId(doc.user)}) 
        }catch(err){
            return res.status(500).send({message:"Unexpected Error"})
        }
        if(user.health == 1){
            try{
            await DB.dbo.collection('users').updateOne({_id:new ObjectId(doc.user)}, {
                $set: { 'status': 'banned' }, 
                $inc: { 'health': -1 } 
            }) 
            }catch(err){
            return res.status(500).send({message:"Unexpected Error"})
            }
        }else{
            try{
            await DB.dbo.collection('users').updateOne({_id:new ObjectId(doc.user)},{
                $inc: { 'health': -1 } 
            }) 
            }catch(err){
                return res.status(500).send({message:"Unexpected Error"})
            } 
        }

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
    collection.find({user:new ObjectId(req.token.userId)}).toArray(function(err, docs) {
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