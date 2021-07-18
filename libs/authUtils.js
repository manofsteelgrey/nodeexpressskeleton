'use strict';
const events = require('events');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../config/jwt/public.pem');
const dbConfig = require('../config/dbConfig.json');
const { nextTick } = require('process');
const PASS_PHRASE = dbConfig.PASS_PHRASE;
const  PUBLIC_KEY = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
const TokenValidatedEvent = "TokenValidated";

class Publisher{
    validateToken = (req,res,next) =>{
        const token = req.body.token;
        jwt.verify(token,PUBLIC_KEY, function(err, decoded) {
            if (err) {
               return res.send(500,err);
            }
            next();
        });
   }
}


class Subscriber{

}
const publisher = new Publisher();
const subscriber = new Subscriber();

module.exports = publisher;