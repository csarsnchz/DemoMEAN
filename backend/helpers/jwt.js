'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
const secret = 'Ch1pilinisim0';

exports.createToken = function(user){
  var payload = {
    sub: user._id,
    nombres: user.nombres,
    apellidos: user.apellidos,
    email: user.email,
    init: moment().unix(),
    exp: moment().add(2,'days').unix()
  }
  return jwt.encode(payload,secret);
}
