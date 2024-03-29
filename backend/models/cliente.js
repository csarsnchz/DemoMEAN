'use strict'

var mongoose = require('mongoose');
const schema = mongoose.Schema;

var clienteSchema = schema({
  nombres: {type: String, required: true},
  apellidos: {type: String, required: true},
  pais: {type: String, required: false},
  email: {type: String, required: true},
  password: {type: String, required: true},
  perfil: {type: String, default: 'perfil1.png', required: true},
  telefono: {type: String, required: false},
  genero: {type: String, required: false},
  fec_nac: {type: String, required: false},
  dni: {type: String, required: false},
  createdAt: {type: Date, default: Date.now, required: true},
});

module.exports = mongoose.model('cliente',clienteSchema);