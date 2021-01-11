const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const nodepath=require('path');
let botConfig = require('./botConfig');
const botservice = require('@zoomus/botservice');
let expressApp = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const hbs = require('./hbs');
const mongoClient = require('mongodb').MongoClient
const NODE_ENV='development';

dotenv.config()

//connect to db
const DB_URL = process.env.mongodb_uri + ':27017'
const DB_NAME = "standupbot"

console.log(DB_URL)

mongoClient.connect(DB_URL, function(err, client) {
  console.log(err)
  console.log("Connected successfully to server");
 
  const db = client.db(DB_NAME);
 
  client.close();
});

//middleware body
expressApp.use(bodyParser.json());
expressApp.use(cookieParser());
expressApp.use(
  bodyParser.urlencoded({
    extended: false
  })
);

expressApp.use(compression());
//middleware end
if(NODE_ENV==='development'){
  expressApp.use(cors());
}

botservice(expressApp, botConfig); //core

//set hbs setting end
let rootDir=nodepath.resolve('views/assets');
expressApp.use(express.static(rootDir));

expressApp.set('view engine','hbs');
hbs.registerPartials(nodepath.resolve('views'));

module.exports = expressApp;
