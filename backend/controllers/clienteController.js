'use strict'

var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_cliente = async function(req, res){
  var data = req.body;
  var clientes_array =  [];

  clientes_array = await Cliente.find({email: data.email});

  if(clientes_array.length == 0){
    if (data.password){
      bcrypt.hash(data.password,null,null, async function(err, hash){
        if (hash){
          data.password = hash;
          var reg = await Cliente.create(data);
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

const login_cliente = async function(req, res){
  var data = req.body;
  var cliente_array = [];

  cliente_array = await Cliente.find({email: data.email});

  if (cliente_array == 0){
    res.status(200).send({message: 'No se encontro el usuario', data:undefined});
  } else {
    let user = cliente_array[0];

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

const listar_clientes_filtro_admin = async function(req, res){
  let clientes = await Cliente.find();
  res.status(200).send({data:clientes});
}

module.exports = {
  registro_cliente,
  login_cliente,
  listar_clientes_filtro_admin
}