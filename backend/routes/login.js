const express = require("express");
const ruteador = express.Router();
const data = require("../usuarios.json");
const connection = require("../config/default");
const usuarios = require('../models/user');

ruteador.post("/", function (req, res){
    const {usuario, clave} = req.body;
    console.log(usuario  +  " " + clave);
    usuarios.find({
        user: usuario,
        password: clave
    }).exec(function(err, persona){
        if(err) throw err;
        if(persona!=null){
            console.log(persona[0].user);
            res.send(persona[0].user);
        }else{
            res.send("no");
        }
    });
});

module.exports = ruteador;