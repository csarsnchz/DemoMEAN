'use strict'

var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_admin = async function(req, res){
  var data = req.body;
  var admin_array =  [];

  admin_array = await Admin.find({email: data.email});

  if(admin_array.length == 0){
    if (data.password){
      bcrypt.hash(data.password,null,null, async function(err, hash){
        if (hash){
          data.password = hash;
          var reg = await Admin.create(data);
          res.status(200).send({data:reg});
        } else {
           res.status(200).send({message:'Error Server',data:undefined});
        }
      });
    } else {
      res.status(200).send({message:'No hay contraseña',data:undefined});
    }
    
  } else {
    res.status(200).send({message:'El Usuario ya existe',data:undefined});
  }
  
}

const login_admin = async function(req, res){
  var data = req.body;
  var admin_array = [];

  admin_array = await Admin.find({email: data.email});

  if (admin_array == 0){
    res.status(200).send({message: 'No se encontro el usuario', data:undefined});
  } else {
    let user = admin_array[0];

    bcrypt.compare(data.password, user.password, async function(err,check){
      if (check){
        res.status(200).send({
          data:user,
          token: jwt.createToken(user)
        });  
      } else {
        res.status(200).send({message: 'La contraseña no coincide', data:undefined});
      }  
    });
    
  }
  
}

module.exports = {
  registro_admin,
  login_admin
}