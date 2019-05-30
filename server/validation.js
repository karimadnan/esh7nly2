const jwToken=require('./Jwt');
const Joi =require('joi');




let Validator =  {
	OrderValidation:{
		paymentMethod: Joi.string().valid(["Etisalat Cash","Vodafone Cash","Fawry", "Cash On Delivery"]).label('Payment Method').required(),
		orderType: Joi.string().valid(["Games","Products"]).label('Order Type').required(),
		transId:Joi.string().regex(/^[0-9]+$/, 'numbers').min(12).max(12).label('Transaction id'),
		cart:Joi.array().min(1).required(),
		totalPrice:Joi.string().required(),
	},
	signup:{
		Name:Joi.string().min(3).max(15).required(),
		Phone:Joi.string().regex(/^[0-9]+$/, 'numbers').min(11).max(11).required(),
		Password:Joi.string().min(8).max(20).regex( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,21}$/,'must contain uppercase lowercase and number').required(),
		Email:Joi.string().email().required(),
		Captcha:Joi.string().required(),
	},
	ShippingData:{
		FirstName:Joi.string().min(3).max(10).regex(/^[a-zA-Z]+$/, "must be letters only").label("First Name").required(),
		LastName:Joi.string().min(3).max(10).regex(/^[a-zA-Z]+$/, "must be letters only").label("Last Name").required(),
		Phone:Joi.string().regex(/^[0-9]+$/, 'numbers').min(11).max(11).required(),
		City:Joi.string().valid(["Cairo","Giza","Helwan", "6 of october"]).label('City').required(),
		Area:Joi.string().min(3).max(30).label('Area').required(),
		StreetNameNo:Joi.string().min(3).max(30).label('Street Address').required(),
		LocationType:Joi.string().valid(["Home","Business"]).label('Location Type').required(),
		ShippingNote:Joi.string().max(50).label('Shipping Note'),
		ShippingPrice:Joi.string().required(),
	},
	
	check: function (body, validateTarget) {
		return new Promise((resolve, reject) => {
			Joi.validate(body, Validator[validateTarget], (err, value) => {
				if(err){
					return reject({ message: err.details[0].message })
				}
				resolve(body);
			 });
		})
	},
	checkJWT: function (req, res, next) {   
        var token;
        if (req.headers && req.headers.authorization) {
			token=req.headers.authorization;
        } else if (req.query.token) {
            token = req.query.token;
        } else { 
            return res.status(401).send({ message: 'No Authorization found' });
        }
        jwToken.verify(token, function (err, payload) {
            if (err) {
                console.log(err);
                return res.status(401).send({ message: 'Token Invalid' });
            };
            req.token = payload;
                next();          
        });
	},
	isAdmin:function (req,res,next) {
        if(req.token.isAdmin){
			return next();     
        }
	    return res.status(401).send({ message: 'unAuthorized Action' });
    },
}

module.exports = Validator;