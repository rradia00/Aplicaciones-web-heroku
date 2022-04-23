const express = require('express');
const ruteador = express.Router();
var usuarios = require('../models/user');

ruteador.get("/" , function (req, res){
    usuarios.find({}).exec(async function(err, personas){
        res.send(personas);
    });
});

module.exports = ruteador;