'use strict';
const events = require('events');
const user = require('../../dal/models/user/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../config/jwt/private.pem');
const dbConfig = require('../../config/dbConfig.json');
const PASS_PHRASE = dbConfig.PASS_PHRASE;
const  PRIVATE_KEY = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});

const eventsEmitter = new events.EventEmitter();

let eventAuthentication = 'authenticated';
let eventValidation = 'validated';

class Publisher {
  constructor(){
  } 
  validateUser = async(req, res)=>{  
    let userID = req.body.userID;
    let password = req.body.password;
    if(!userID || userID == "" || !password || password == "")
        return res.send(400, "UserID/ Password Missing")
    user.findOne({id:userID}, async (err,user)=>{
        if(err)
             return res.send(400, "Error retieving User", err);
             const match = await bcrypt.compare(password,user.password); 
             if(match){
                 req.user = user;
                 eventsEmitter.emit(eventValidation, req, res);
             }
    })
  }
}

class Subscriber {
    constructor(){ 
        let autheticateUser = (req, res) =>{
            const options = {
                algorithm: 'RS256',
                expiresIn:  60
            }
            jwt.sign({ user: req.user.id },  {key: PRIVATE_KEY, passphrase: PASS_PHRASE}, options , function(err, token) {
                if(err)
                    res.send(500,err);
                eventsEmitter.emit(eventAuthentication, token, res);
            });
        }    
        eventsEmitter.on(eventValidation, (req, res) => {
            autheticateUser(req, res);
        });

        eventsEmitter.on(eventAuthentication, (token, res) => {
            res.status(200).send({token:token});
        });
    }
}

const publisher = new Publisher();
const subscriber = new Subscriber();

module.exports = publisher;