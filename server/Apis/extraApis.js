const DB = require('../Mongo');
const Validator =require('../validation');
const ObjectId = require('mongodb').ObjectID;

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'karimmadnan@gmail.com',
        pass: '12121995a'
    }
});

const extraApis = {
    sendEmail:function(req, res) {
        var body =req.body;
        let mailOptions = {
            from: `${body.from}`, // sender address
            to: `contact@ggegypt.com`, // list of receivers
            subject: `${body.subject}`, // Subject line
            text: `${body.text}.`, // plain text body
          };
        
        // send mail with defined transport object
            transporter.sendMail(mailOptions).then(success => {
                console.log(success, "Email SENTTT")
                return res.status(200).send({ message: 'Email Sent',data:[]});
            },err=>{
                console.log(err, "Email failed")
                return res.status(200).send({ message: 'Email Failed',data:[]});
            })
    },
    fetchShop:function(req, res){
        const collection = DB.dbo.collection('products');
        collection.aggregate([
            { $sort: { power: -1 } }
          ]).toArray(function(err, docs){
            if(err){
            return res.status(500).send({ message: 'DB Error',error:err});
            }
            if(!docs[0]){
            return res.status(202).send({ message: 'No Data'});
            }
        return res.status(200).send({ message: 'all products',data:docs});
        });
    }
};

module.exports = extraApis;