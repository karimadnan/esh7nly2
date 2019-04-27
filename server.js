const http = require('http');
const https = require('https');
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
const PORT2 = normalizePort(process.env.PORT || 5000);

const app = express();
const compression = require('compression');
app.use(compression());

const fs = require('fs');
const cert = fs.readFileSync('./ssl/www_ggegypt_com.crt');
const ca = fs.readFileSync('./ssl/www_ggegypt_com.ca-bundle');
const key = fs.readFileSync('./ssl/server.key');

const hostname = 'ggegypt.com';

let options = {
  cert: cert,
  ca: ca,
  key: key
};

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

  const server = http.createServer(app, (req, res) => {
    res.statusCode = 301;
    res.setHeader('Location', `https://${hostname}${req.url}`);
    res.end(); 
 });

  const secureServer = https.createServer(options, app, (req, res) => {
    res.statusCode = 200;
    res.end("<h1>HTTPS server running</h1>");
 });

  DB.connect(url, dbname).then(success => {
    console.log("Server Connected  ---!")
    // server.listen(PORT);
    secureServer.listen(PORT);
  }, err => {
    console.log('Failed To connect DB',err);	
    process.exit(1);
  })
  // server.listen(PORT, err=>{
  //     if (err) throw err ;
  //     console.log("Connected  ---!")
  //  })
   