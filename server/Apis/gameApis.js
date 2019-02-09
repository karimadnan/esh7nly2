let DB = require('../Mongo');
const Validator =require('../validation');
var ObjectId = require('mongodb').ObjectID;


const gameApis = {
getGame:function(req, res, next) {
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
}
   
};

module.exports = gameApis;