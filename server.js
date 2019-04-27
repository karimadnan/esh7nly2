const http = require('http');
const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
var Routers = require('./server/Routes/routes');
var userRoutes = require('./server/Routes/userRoutes');
var bodyParser = require('body-parser');
const url = process.env.MONGODB_URI;
const dbname = process.env.DBName;
let DB = require('./server/Mongo');
const normalizePort =port => parseInt(port ,10);
const PORT = normalizePort(process.env.PORT || 4000);
const app = express();
const compression = require('compression');
app.use(compression());

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, parameterLimit: 100000, limit: "50mb" }));
app.use(express.static(path.resolve(__dirname, 'build')));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("WWW-Authenticate", "xBasic realm=\"\"");
    next();
  });
  app.use('/', userRoutes)
  app.use('/server', Routers);

  const server = http.createServer(app)

  DB.connect(url, dbname).then(success => {
    console.log("Server Connected  ---!")
    // server.listen(PORT);
    server.listen(PORT);
  }, err => {
    console.log('Failed To connect DB',err);	
    process.exit(1);
  })
  // server.listen(PORT, err=>{
  //     if (err) throw err ;
  //     console.log("Connected  ---!")
  //  })
   