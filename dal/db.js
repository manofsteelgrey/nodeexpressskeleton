const mongoose = require('mongoose');
const dbConfig = require('../config/dbConfig.json')

const MONGO_USERNAME = dbConfig.MONGO_USERNAME;
const MONGO_PASSWORD = dbConfig.MONGO_PASSWORD;
const MONGO_HOSTNAME = dbConfig.MONGO_HOSTNAME;
const MONGO_PORT = dbConfig.MONGO_PORT;
const MONGO_DB = dbConfig.MONGO_DB;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url, {useNewUrlParser: true}, function(err,data){
    if(err){
        throw err;
    }
    console.log("DB Is connected")
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

