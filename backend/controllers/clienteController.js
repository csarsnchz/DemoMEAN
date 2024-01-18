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

  if(req.user){
    if(req.user.role == 'admin'){
      let tipo = req.params['tipo'];
      let filtro = req.params['filtro'];
    
      if (tipo == null || tipo == 'null'){  
        let clientes = await Cliente.find();
        res.status(200).send({data:clientes});
        return;
      }else {
        if (tipo == 'email'){
          let clientes = await Cliente.find({email: new RegExp(filtro, 'i')});
          res.status(200).send({data:clientes});
          return;
        } else if (tipo == 'apellidos'){
          let clientes = await Cliente.find({apellidos: new RegExp(filtro, 'i')});
          res.status(200).send({data:clientes});
          return;
        }
      }  
    } else {
      res.status(401).send({message:'No Authorized'});
    }
  } else {
    res.status(403).send({message:'Forbidden'});
  } 
}

const registro_cliente_admin = async function(req, res){
  if(req.user){
    if (req.user.role == 'admin'){
      var data = req.body;
      bcrypt.hash('Pa$$W0rd',null,null, async function(err, hash){
        if (!err){
          data.password = hash;
          let reg = await Cliente.create(data);
          res.status(200).send({data:reg});
          
        } else {
           res.status(200).send({message:'Error Server',data:undefined});
        }
      });
    } else {
      res.status(401).send({message:'No Authorized'});
    }
  } else {
    res.status(403).send({message:'Forbidden'});
  } 
} 

const obtener_cliente_admin = async function(req, res){
  if(req.user){
    if (req.user.role == 'admin'){
      let id = req.params['id'];
      try {
        let cliente = await Cliente.findById({_id:id});
        res.status(200).send({data:cliente});
      } catch (error) {
        console.log(error);
        res.status(200).send({data:undefined});
      }
      
    } else {
      res.status(401).send({message:'No Authorized'});
    }
  } else {
    res.status(403).send({message:'Forbidden'});
  } 
}

const actualizar_cliente_admin = async function(req, res){
  if(req.user){
    if (req.user.role == 'admin'){
      let id = req.params['id'];
      let data = req.body;
      try {
        let cliente = await Cliente.findByIdAndUpdate({_id:id},
          {
            nombres: data.nombres,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            fec_nac: data.fec_nac,
            dni: data.dni,
            genero: data.genero
          });
        res.status(200).send({data:cliente});
      } catch (error) {
        console.log(error);
        res.status(200).send({data:undefined});
      }
      
    } else {
      res.status(401).send({message:'No Authorized'});
    }
  } else {
    res.status(403).send({message:'Forbidden'});
  } 
}

module.exports = {
  registro_cliente,
  login_cliente,
  listar_clientes_filtro_admin,
  registro_cliente_admin,
  obtener_cliente_admin,
  actualizar_cliente_admin
}