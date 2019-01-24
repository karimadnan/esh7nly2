
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
        {value:'user',msg:'You need to login'}
    ],
	check: function (body, validateTarget) {
		return new Promise((resolve, reject) => {
			if (!body || typeof (body) !== 'object') {
				reject({ message: 'Missing the body' });
			}
			let rejectMsg = false;
			Validator[validateTarget].forEach(item=>{
				if(!item.oneOfTheseIsRequired && (typeof body[item['value']] == 'undefined')){
					reject({ message: `${item.msg} is missing .` });
				}
				if(item.objectPropertiesAllRequired){
					item.objectPropertiesAllRequired.forEach(required=>{
						if(!body[item['value']][required['value']] || typeof body[item['value']][required['value']]== 'undefined'){
							reject({ message: `${required.msg} is missing`});
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
	}
}

module.exports = Validator;