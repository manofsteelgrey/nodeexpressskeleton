'use strict';
const events = require('events');
const user = require('../../dal/models/user/userModel');
const bcrypt = require('bcrypt');
const dbConfig = require('../../config/dbConfig.json')
const saltRounds = dbConfig.SALT_ROUNDS;
const eventsEmitter = new events.EventEmitter();

let userCreationEvent = 'usercreation';
class Publisher {
  constructor(){
  } 

  getUsers = (req,res) => {
    user.find({}, { projection: { name: 1, id: 1, email: 1 }}, {limit:5}, function (err, docs) {
        if (err)
             res.send(500,err);
      res.status(200).send({users:docs});
   });
  }
  

  createUser = (req, res)=>{
    let password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if(err)
            return res.send(500, "Error while Hashing");
      let newUser = new user(
        {
            name: req.body.name,
            id: req.body.id,
            password: hash,
            dob: req.body.dob,
            gender: req.body.gender,
            email: req.body.email
        }
      );
      newUser.save((err,data)=>{
        if(err)
          return res.send(400, err.message);
          eventsEmitter.emit(userCreationEvent, res, data);
      });
    });
    
  }
}

class Subscriber {
  constructor(){
    eventsEmitter.on(userCreationEvent, (res, data) => {
      res.send(200,"User Created Succesfully", data);
    });
  }
}

const publisher = new Publisher();
const subscriber = new Subscriber();

module.exports = publisher;