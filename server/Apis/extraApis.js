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
    }
};

module.exports = extraApis;