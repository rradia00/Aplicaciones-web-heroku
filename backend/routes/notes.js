const { json } = require('express');
const express = require('express');
const ruteador = express.Router();
const notas = require('../models/note');
const usuarios = require('../models/user');

ruteador.get("/", function (req, res){
    var i=0;
    var devolucion = false;
    var encontrado=null;
    const usuario = req.baseUrl.split("/")[1];

    usuarios.find({
        user: usuario
    }).exec(async function(err, personas) {
        if (err) throw err;
        notas.find({
            user: personas[0]._id
        }).exec(async function(err, notas) {
            if (err) throw err;
            console.log(notas);
            res.send(notas);
        });
    });
});

ruteador.post("/", function (req, res){
    var i=0;
    var devolucion = false;
    const usuario = req.baseUrl.split("/")[1];
    const {titulo, cuerpo} = req.body;

    usuarios.find({
        user: usuario
    }).exec(function(err, personas) {
        if (err) throw err;
        console.log(personas);

        const note = new notas({ title: titulo, description: cuerpo, user: personas[0]._id }); 
        note.save();
        console.log("Nueva nota: " + titulo);
    });

    
    res.send("Nueva nota añadida 👍");
});

ruteador.put("/:nota", function (req, res){
    const titulo = req.params.nota;
    console.log("Editando la nota: " + titulo);
    const usuario = req.baseUrl.split("/")[1];
    const {nuevoTitulo, nuevoCuerpo} = req.body;

    notas.find({
        title: titulo
    }).exec(function(err, devolucion) {
        if (err) throw err;
        devolucion[0].title = nuevoTitulo;
        devolucion[0].description = nuevoCuerpo;
        devolucion[0].save(function(err){
            if(err) throw err;
        });
    });
    res.send("Modificación de la nota del usuario");
});

ruteador.delete("/:nota", function (req, res){
    console.log("borrando la nota: " + req.params.nota);
    const tituloBorrar = req.params.nota;

    notas.deleteOne({
        title: tituloBorrar
    }).exec(function(err, devolucion) {
        if (err) throw err;
    });

    res.send("A pique el portaaviones");

});

module.exports = ruteador;