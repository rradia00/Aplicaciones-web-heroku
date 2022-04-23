var mongoose = require('mongoose')
var Schema = mongoose.Schema
const note = new Schema({
    title: String,
    description: String,
    user: Object
});

var nota = mongoose.model('Notes', note)
module.exports = nota