'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
const secret = 'MzYfTpTo2r5ChEYwzZfC';

exports.auth = function (req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'No headers Error'});
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');

    var segment = token.split('.');

    if(segment.lenght <= 3){
        return res.status(403).send({message:'No valid Token structure'});
    } else {
        try {
            var payload = jwt.decode(token,secret);
            if(payload.exp <= moment().unix()){
                return res.status(403).send({message:'Token Expired'});
            }
        }catch (error){
            return res.status(403).send({message:'Invalid Token'});
        }

    }
    req.user = payload;

    next();
}