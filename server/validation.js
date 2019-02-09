const jwToken=require('./Jwt');
let Validator =  {
	// obje: [
	// 	{value:'value',msg:'output'},
	// 	{oneOfTheseIsRequired: ['x', 'y'], 
	// 	msg: 'both are missing',
	// 	msg2: 'both are exists'}	
    // ],
    NewOrder:[
        {value:'game',msg:'No game selected'},
        {value:'paymentMethod',msg:'No paymentMethod selected'},
		{value:'orderType',msg:'No orderType selected'},
		{value:'transId',msg:'Enter You transaction id'},
		{value:'extra',msg:'No extra Date'}
	],
	signup:[
		{value:'Name',msg:'Enter Your Name'},
		{value:'Phone',msg:'Enter Your Phone'},
		{value:'Password',msg:'Enter Your Password'},
        {value:'Gender',msg:'No Gender selected'},
        {value:'Email',msg:'Enter Your Email'}
	],
	check: function (body, validateTarget) {
		return new Promise((resolve, reject) => {
			if (!body || typeof (body) !== 'object') {
				reject({ message: 'Missing the body' });
			}
			let rejectMsg = false;
			Validator[validateTarget].forEach(item=>{
				if(!item.oneOfTheseIsRequired && (typeof body[item['value']] == 'undefined')){
					reject({ message: `${item.msg} ` });
				}
				if(item.objectPropertiesAllRequired){
					item.objectPropertiesAllRequired.forEach(required=>{
						if(!body[item['value']][required['value']] || typeof body[item['value']][required['value']]== 'undefined'){
							reject({ message: `${required.msg}`});
						}
					});
				}
				if(item.oneOfTheseIsRequired){
					let count = 0;
					item.oneOfTheseIsRequired.forEach(item2=>{
						if(!body[item2] || typeof body[item2] == 'undefined'){
							count++;
						}
					})
					if(count == item.oneOfTheseIsRequired.length || count == 0){
						rejectMsg = { message: item.msg };
					}
					if(count == 0){
						rejectMsg = { message: item.msg2 };
					}
				}				
			})
			if(rejectMsg){
				return reject(rejectMsg);
			}

			resolve(body);
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
        if(req.token.access && req.token.access == 2){
			return next();     
        }
	    return res.status(401).send({ message: 'unAuthorized Action' });
    },
}

module.exports = Validator;