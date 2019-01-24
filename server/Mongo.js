var MongoClient = require('mongodb').MongoClient;
class DataBase{
constructor(){
    this.db = null;
    this.dbo = null;
}
async connect(url, dbname) { 
    const _this = this;
    return new Promise(async (resolve) => { 
        // init the db connection.
        MongoClient.connect(url,{ useNewUrlParser: true }).then(connection => { 
            _this.db = connection;
            _this.dbo = _this.db.db(dbname);
            return resolve(_this.dbo);
        }, err => { 
            console.log('Failed To connect DB',err);
            process.exit(1);
        })
    })
    
}

}


module.exports =  new DataBase();