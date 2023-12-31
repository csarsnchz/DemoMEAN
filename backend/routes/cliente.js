'use strict'

var express = require('express');
var clienteController = require('../controllers/clienteController');
var auth = require('../middlewares/authenticate');

var api = express.Router();

api.post('/registro_cliente',clienteController.registro_cliente);
api.post('/login_cliente',clienteController.login_cliente);
api.get('/listar_clientes_filtro_admin/:tipo/:filtro?',auth.auth,clienteController.listar_clientes_filtro_admin);

module.exports = api;