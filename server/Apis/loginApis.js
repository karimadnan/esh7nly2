let DB = require('../Mongo');
var bcrypt = require('bcrypt-nodejs');
const Validator =require('../validation');
const jwToken=require('../Jwt');


const loginApis = {

login:async function(req, res, next) {
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

},
signup:function(req, res, next) {
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

}


};

module.exports = loginApis;